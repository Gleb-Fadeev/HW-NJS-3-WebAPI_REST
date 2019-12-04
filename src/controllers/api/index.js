const { Router } = require('express');
const filmController = require('./film.controller');

const router = new Router();

router.use('/films', filmController);

module.exports = router;