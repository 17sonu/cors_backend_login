// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a new user
router.post('/create', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const newUser = await User.create({ name, email, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Get user details
router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
});

router.post ('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).send('Login successful');
    } else {
      res.status(400).send('Invalid email or password');
    }
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

module.exports = router;