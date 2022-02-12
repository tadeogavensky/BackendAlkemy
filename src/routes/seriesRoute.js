const express = require('express');
const router = express.Router();
const seriesController = require('../controllers/moviesSeriesController.js');

//Routes
router.get('/:token', seriesController.serieList)
router.get('/:token/filter', seriesController.searchSeries)
router.get('/:token/detail/:id', seriesController.serieDetail)


module.exports = router;