const request = require('supertest');

const config = require('../../config/app');
const app = require('../../index');
const fixtures = __dirname + '/fixtures';

describe('Test file import API', () => {
  let server;
  beforeAll(() => {
    server = app.listen(config.port, () => {
      console.log(`App running on ${config.port}`);
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('test POST /fileImport', () => {
    it('should return 200', (done) => {
      request(server)
        .post('/fileImport')
        .attach('file', `${fixtures}/0.1hoc0c4zeqi.csv`)
        .expect(200, done);
    });

    it('should return 400', (done) => {
      request(server)
        .post('/fileImport')
        .expect(400, done);
    });
  });
});
