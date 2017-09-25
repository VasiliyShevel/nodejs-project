const fileImportService = require('../../services/file-import');

const save = (req, res) => {
  const data = req.file;
  fileImportService.save(data).then(() => {
    res.send({
      status: 'ok',
    });
  }).catch((err) => {
    console.log(err);
  });
};

module.exports = {
  save,
};
