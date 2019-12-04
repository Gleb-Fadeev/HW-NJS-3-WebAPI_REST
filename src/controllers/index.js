const { Router } = require('express'); //
const homeController = require('./home.controller');
const filmController = require('./film.controller');
const apiControllers = require('./api');

const router = new Router();

router.use('/', homeController);
router.use('/films', filmController);
router.use('/api', apiControllers);

module.exports = router;