const fileImportService = require('../../services/file-import');

const save = (req, res) => {
  fileImportService.save(req).then(() => {
    res.send({
      status: 'ok',
    });
  }).catch((err) => {
    res.status(400);
    res.send(err);
  });
};

module.exports = {
  save,
};
