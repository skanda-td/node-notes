const express = require('express');
require('dotenv').config();

const { getNotes, addNote } = require('./services/notesService');

const app = express();
app.use(express.json()); // Middleware to parse JSON

const PORT = process.env.PORT || 3000;
const FILE_PATH = process.env.FILE_PATH;

/**
 * Health check
 */
app.get('/', (req, res) => {
  res.send('Server running');
});

/**
 * Get all notes
 */
app.get('/notes', async (req, res) => {
  try {
    const notes = await getNotes(FILE_PATH);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});


/**
 * Add note
 */
app.post('/notes', async (req, res) => {
  try {
    const note = req.body;

    if (!note.title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newNote = await addNote(FILE_PATH, note);

    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add note' });
  }
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});