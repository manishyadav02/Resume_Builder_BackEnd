const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const { requireAuth } = require('../middlewares/authMiddleware');

// Protect all resume routes
router.use(requireAuth);

router.post('/', resumeController.createResume);
router.get('/:id', resumeController.getResume);
router.put('/:id', resumeController.updateResume);

module.exports = router;
