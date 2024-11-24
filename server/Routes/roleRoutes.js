const express = require('express');
const Role = require('../models/Role');
const router = express.Router();

// Get all roles
router.get('/', async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
});

// Create a new role
router.post('/', async (req, res) => {
  const { name, permissions } = req.body;
  try {
    const role = new Role({ name, permissions });
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a role
router.put('/:id', async (req, res) => {
  const { name, permissions } = req.body;
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, { name, permissions }, { new: true });
    res.json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a role
router.delete('/:id', async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: 'Role deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
