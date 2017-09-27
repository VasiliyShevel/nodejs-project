const Sequelize = require('sequelize');
const config = require('../../config/config.json')['test'];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const User = require('../../models').user;

describe('Test user model', function() {

  test('should create a new User', () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      job: 'Driver',
      phone: '+61 333 3333'
    };

    User.create(newUser).then((user) => {
      expect(user.firstName).toBe('John');
    })
  });

  afterAll((done) => {
    sequelize.close(() => {
      done();
    });
  });

});