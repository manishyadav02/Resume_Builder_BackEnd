const mongoose = require('mongoose');
const Resume = require('./src/models/Resume');
const User = require('./src/models/User');

mongoose.connect('mongodb://127.0.0.1:27017/resumebuilder').then(async () => {
  const users = await User.find();
  console.log('Users:', users.length);
  if (users.length > 0) {
    const user = users[0];
    try {
      const initialResume = await Resume.create({
        user: user._id,
        title: 'My First Resume'
      });
      console.log('Successfully created resume:', initialResume._id);
    } catch (err) {
      console.error('Error creating resume:', err.message);
    }
  }
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
