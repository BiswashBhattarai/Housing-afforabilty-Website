const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const DATA_PATH = path.join(__dirname, '..', 'data', 'neighborhoods.json');

function readData() {
  const raw = fs.readFileSync(DATA_PATH);
  return JSON.parse(raw);
}

// GET /api/neighborhoods
router.get('/', (req, res) => {
  try {
    const data = readData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read neighborhoods data' });
  }
});

// GET /api/neighborhoods/:id
router.get('/:id', (req, res) => {
  try {
    const data = readData();
    const item = data.find((n) => n.id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Neighborhood not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read neighborhoods data' });
  }
});

module.exports = router;
