// routes/projectRoutes.js
const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const router = express.Router();

// Create a new project
router.post('/create', async (req, res) => {
  const { name, description } = req.body;
  try {
    const newProject = await Project.create({ name, description });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project' });
  }
});

// Assign users to a project
router.post('/:projectId/assign-users', async (req, res) => {
  const { projectId } = req.params;
  const { userIds } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { assignedUsers: { $each: userIds } } },
      { new: true }
    ).populate('assignedUsers');
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error assigning users' });
  }
});

// View all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('assignedUsers');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving projects' });
  }
});

module.exports = router;