const { readFile, writeFile } = require('../utils/fileHandler');

/**
 * Get all notes
 */
const getNotes = async (filePath) => {
  const data = await readFile(filePath);
  return JSON.parse(data);
};

/**
 * Add a new note
 */
const addNote = async (filePath, note) => {
  const notes = await getNotes(filePath);

  // Add ID (simple logic)
  const newNote = {
    id: Date.now(),
    ...note
  };

  notes.push(newNote);

  await writeFile(filePath, JSON.stringify(notes, null, 2));

  return newNote;
};

module.exports = { getNotes, addNote };