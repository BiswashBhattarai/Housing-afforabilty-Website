/**
 * Simple Express server for Iowa City Housing Affordability
 * - serves REST endpoints for neighborhoods, affordability calculations, and market trends
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

// Routes
app.use('/api/neighborhoods', require('./routes/neighborhoods'));
app.use('/api/calculate-affordability', require('./routes/calculate'));
app.use('/api/market-trends', require('./routes/marketTrends'));

// Basic health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Backend API listening on http://localhost:${PORT}`);
});
