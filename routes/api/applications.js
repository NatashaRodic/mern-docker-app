const express = require('express');
const router = express.Router();
const applicationsCtrl = require('../../controllers/api/applications');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const requireRole = require('../../middleware/requireRole');

// Apply the ensureLoggedIn middleware to all routes
router.use(ensureLoggedIn);

// GET /api/applications/pending
router.get('/pending', requireRole('teacher'), applicationsCtrl.getPendingApplications);

// GET /api/applications/user/:userId
router.get('/user/:userId', applicationsCtrl.getByUser);

// GET /api/applications/:courseId
router.get('/:courseId', applicationsCtrl.show);

// POST /api/applications/
router.post('/', requireRole('student'), applicationsCtrl.create);

// PUT /api/applications/:id/approve
router.put('/:id/approve', requireRole('teacher'), applicationsCtrl.approve);

// PUT /api/applications/:id/deny
router.put('/:id/deny', requireRole('teacher'), applicationsCtrl.deny);


module.exports = router;