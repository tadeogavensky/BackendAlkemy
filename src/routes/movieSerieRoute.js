const express = require('express');
const router = express.Router();
const moviesSeriesController = require('../controllers/moviesSeriesController.js');

//Routes
router.get('/create/:token/:title/:date/:rating/:type/:fkGenre', moviesSeriesController.create);
router.get('/edit/:token/:id/:title?/:date?/rating?/:type?/:fkGenre?/:image?',moviesSeriesController.edit)
router.get('/delete/:token/:id',moviesSeriesController.delete)

module.exports = router;