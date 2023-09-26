const express = require('express');

const fabula = require('./modules/fabula')


const router = express.Router();

router.use('/', fabula);

module.exports = router;
