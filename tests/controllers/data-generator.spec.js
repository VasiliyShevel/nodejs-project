const request = require('supertest');

const config = require('../../config/app');
const app = require('../../index');

describe('Test data generator API', () => {
  let server;
  beforeAll(() => {
    server = app.listen(config.port, () => {
      console.log(`App running on ${config.port}`);
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('test POST /generateData', () => {
    it('should return 200', (done) => {
      request(app)
        .post('/generateData')
        .send({
          'rows': 5,
        })
        .expect(200, done);
    });

    it('should return 400', (done) => {
      request(app)
        .post('/generateData')
        .expect(400, done);
    });
  });
});
