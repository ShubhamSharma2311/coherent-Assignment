const express = require('express');
const router = express.Router();
const { getVaccines, getSummary, getFilters, getChartData, getInsights } = require('../controllers/vaccineController');

router.get('/vaccines', getVaccines);
router.get('/summary', getSummary);
router.get('/filters', getFilters);
router.get('/charts', getChartData);
router.get('/insights', getInsights);

module.exports = router;
