const Resume = require('../models/Resume');

// Create a new resume
exports.createResume = async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    const savedResume = await newResume.save();
    res.status(201).json(savedResume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get resume by ID
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Auto-save / update resume
exports.updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, lastSaved: Date.now() };
    
    // findOneAndUpdate applies partial updates
    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!updatedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    res.status(200).json({ success: true, lastSaved: updatedResume.lastSaved });
  } catch (error) {
    res.status(500).json({ error: 'Auto-save failed: ' + error.message });
  }
};
