const config = require('./config/app');
const app = require('./index');

app.listen(config.port, () => {
  console.log(`App running on ${config.port}`);
});

module.exports = app;
