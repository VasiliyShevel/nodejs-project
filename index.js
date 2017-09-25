const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const  mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost/generated_data');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

module.exports = app;