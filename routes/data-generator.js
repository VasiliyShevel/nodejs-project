const dataGeneratorCtrl = require('../controllers/data-generator');

const express = require('express');

const app = express();

app.post('/', dataGeneratorCtrl.generateData);
module.exports = app;
