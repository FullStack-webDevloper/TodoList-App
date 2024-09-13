const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies

// MongoDB connection
const dbURI = 'your_mongodb_connection_string_here';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// Task Schema and Model
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

// API Endpoints

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: 'Task name and description are required' });
    }

    const newTask = new Task({
      name,
      description,
      completed: false
    });

    try {
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
      res.redirect("api/tasks'")
    } catch (error) {
      res.status(500).json({ message: 'Error creating task' });
    }
});

// Delete a task by ID
app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

// Mark task as complete or incomplete
app.patch('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const { completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, { completed }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

// Start server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
