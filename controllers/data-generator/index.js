const dataGeneratorService = require('../../services/data-generator');

const generateData = (req, res) => {
  const data = req.body;
  dataGeneratorService.generateFile(data).then(() => {
    res.send({
      status: 'ok',
    });
  }).catch((err) => {
    res.status(400);
    res.send(err);
  });
};

module.exports = {
  generateData,
};