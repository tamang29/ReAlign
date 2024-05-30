const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

s
router.get('/project', projectController.getAllProjects);
router.get('/project/workspace/:id', projectController.getProjectById);


module.exports = router;
