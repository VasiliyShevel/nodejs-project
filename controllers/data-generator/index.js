const dataGeneratorService = require('../../services/data-generator');

const generateData = (req, res) => {
  const data = req.body;
  dataGeneratorService.generateFile(data).then((data) => {
    res.send({
      status: 'ok',
    });
  }).catch((err) => {
    console.log(err);
  });
};

module.exports = {
  generateData,
};