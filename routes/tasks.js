const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('user', 'username email');

    res.json({
      message: 'Tasks retrieved successfully',
      count: tasks.length,
      tasks
    });

  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
});

router.post('/', [
  auth,
  body('title').trim().isLength({ min: 1, max: 100 }),
  body('description').optional().trim().isLength({ max: 500 }),
  body('status').optional().isIn(['pending', 'complete'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation errors', errors: errors.array() });
    }

    const { title, description, status } = req.body;

    const task = new Task({
      title,
      description: description || '',
      status: status || 'pending',
      user: req.user._id
    });

    await task.save();
    await task.populate('user', 'username email');

    res.status(201).json({
      message: 'Task created successfully',
      task
    });

  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error while creating task' });
  }
});

router.put('/:id', [
  auth,
  body('title').optional().trim().isLength({ min: 1, max: 100 }),
  body('description').optional().trim().isLength({ max: 500 }),
  body('status').optional().isIn(['pending', 'complete'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation errors', errors: errors.array() });
    }

    const { title, description, status } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    await task.save();
    await task.populate('user', 'username email');

    res.json({
      message: 'Task updated successfully',
      task
    });

  } catch (error) {
    console.error('Update task error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    res.status(500).json({ message: 'Server error while updating task' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({
      message: 'Task deleted successfully',
      task: {
        id: task._id,
        title: task.title
      }
    });

  } catch (error) {
    console.error('Delete task error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    res.status(500).json({ message: 'Server error while deleting task' });
  }
});

module.exports = router;