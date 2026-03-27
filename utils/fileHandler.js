const fs = require('fs').promises;

/**
 * Reads file asynchronously (non-blocking)
 */
const readFile = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf8');
    return data;
  } catch (err) {
    // If file doesn't exist, return empty array
    if (err.code === 'ENOENT') return '[]';
    throw err;
  }
};

/**
 * Writes file asynchronously
 */
const writeFile = async (path, data) => {
  await fs.writeFile(path, data);
};

module.exports = { readFile, writeFile };