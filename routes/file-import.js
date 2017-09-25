const fileImportCtrl = require('../controllers/file-import');
const multer  = require('multer');
const upload = multer();

const express = require('express');

const app = express();

app.post('/', upload.single('file'), fileImportCtrl.save);
module.exports = app;
