const baseConfig = {
  mysql: {
    dbname: process.env.DB_NAME || 'data',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '11041990',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
  },
};
module.exports = baseConfig;
