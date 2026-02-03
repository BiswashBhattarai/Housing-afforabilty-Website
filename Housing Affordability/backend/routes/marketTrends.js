const express = require('express');
const router = express.Router();

// GET /api/market-trends
// Returns simplified historical price data for charting purposes
router.get('/', (req, res) => {
  // Sample synthetic historical data (year and median price)
  const trends = {
    medianPriceByYear: [
      { year: 2016, median: 200000 },
      { year: 2017, median: 210000 },
      { year: 2018, median: 220000 },
      { year: 2019, median: 230000 },
      { year: 2020, median: 250000 },
      { year: 2021, median: 280000 },
      { year: 2022, median: 300000 },
      { year: 2023, median: 310000 },
      { year: 2024, median: 320000 }
    ],
    rentalTrends: [
      { year: 2018, oneBR: 700, twoBR: 1000 },
      { year: 2019, oneBR: 750, twoBR: 1050 },
      { year: 2020, oneBR: 800, twoBR: 1100 },
      { year: 2021, oneBR: 850, twoBR: 1200 },
      { year: 2022, oneBR: 900, twoBR: 1250 },
      { year: 2023, oneBR: 920, twoBR: 1280 },
      { year: 2024, oneBR: 950, twoBR: 1300 }
    ]
  };

  res.json(trends);
});

module.exports = router;
