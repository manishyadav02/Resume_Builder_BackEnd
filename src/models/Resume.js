const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  id: { type: String }, // Client-side generated UUID
  company: { type: String, default: '' },
  position: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  current: { type: Boolean, default: false },
  description: { type: String, default: '' },
});

const EducationSchema = new mongoose.Schema({
  id: { type: String }, // Client-side generated UUID
  institution: { type: String, default: '' },
  degree: { type: String, default: '' },
  fieldOfStudy: { type: String, default: '' },
  graduationDate: { type: String, default: '' },
});

const ProjectSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, default: '' },
  techStack: { type: String, default: '' },
  description: { type: String, default: '' },
});

const ResumeSchema = new mongoose.Schema({
  // In a real app we would use an ObjectId to ref User, 
  // but for this MVP without full auth we might just use a string identifier or mock it.
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  title: { type: String, default: 'Untitled Resume' },
  templateId: { type: String, default: 'modern' },
  
  personalInfo: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    summary: { type: String, default: '' },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' }
  },
  experience: [ExperienceSchema],
  projects: [ProjectSchema],
  education: [EducationSchema],
  skills: { type: String, default: '' }, // Comma separated for simplicity, or array
  
  lastSaved: { type: Date, default: Date.now }
}, { timestamps: true });

// Ensure we don't return __v and _id internally on arrays if possible
module.exports = mongoose.model('Resume', ResumeSchema);
