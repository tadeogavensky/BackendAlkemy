const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js');

//Routes
router.get('/', mainController.index);
router.get('/token', mainController.checkToken);


module.exports = router;