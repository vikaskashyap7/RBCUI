const express = require('express');
const User = require('../models/User');
const Role = require('../models/Role');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find().populate('role');
  res.json(users);
});

// Create a new user
router.post('/', async (req, res) => {
  const { name, email, role, status } = req.body;
  try {
    const userRole = await Role.findById(role);
    if (!userRole) throw new Error('Role not found');

    const user = new User({ name, email, role, status });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  const { name, email, role, status } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, role, status }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
