require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Database connection
// In a real scenario, use process.env.MONGODB_URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/resumebuilder';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
