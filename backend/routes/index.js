const router = require('express').Router();
const cardsRouter = require('./card');
const usersRouter = require('./user');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

module.exports = router;
