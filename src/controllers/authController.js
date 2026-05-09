const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Resume = require('../models/Resume');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_for_dev', {
    expiresIn: '30d',
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      // Create an initial empty resume for this user
      const initialResume = await Resume.create({
        user: user._id,
        title: 'My First Resume'
      });

      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        resumeId: initialResume._id // Pass the resume ID back so frontend can load it
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Find their resume
      let userResume = await Resume.findOne({ user: user._id });
      
      // If for some reason they don't have one, create one
      if (!userResume) {
        userResume = await Resume.create({ user: user._id, title: 'My Resume' });
      }

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        resumeId: userResume._id
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};
