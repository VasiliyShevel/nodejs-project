const express = require('express');
const dataGeneratorRoute = require('./data-generator');
const fileImportRoute = require('./file-import');

const router = express.Router();

router.use('/generateData', dataGeneratorRoute);
router.use('/fileImport', fileImportRoute);

module.exports = router;
