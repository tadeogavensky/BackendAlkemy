const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesSeriesController.js');

//Routes
router.get('/:token', moviesController.movieList)
router.get('/:token/filter', moviesController.searchMovies)
router.get('/:token/detail/:id', moviesController.movieDetail)



module.exports = router;