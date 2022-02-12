const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController.js');

router.get('/:token', characterController.list);
router.get('/detail/:token/:id', characterController.detail)
router.get('/:token/filter', characterController.search)
router.get('/create/:token/:name/:age/:weight/:story', characterController.create);
router.get('/edit/:token/:id/:name?/:age?/:weight?/:story?/:image?',characterController.edit)
router.get('/delete/:token/:id',characterController.delete)

module.exports = router;