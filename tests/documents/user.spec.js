const  mongoose = require('mongoose');

const User = require('../../documents/user');

describe('Test user document', function() {

  beforeAll((done) => {
    mongoose.connect('mongodb://localhost/test_data', {
      useMongoClient: true,
    });
    mongoose.connection.once('open', () => {
      done();
    })
  });

  afterAll((done) => {
    mongoose.disconnect(() => {
      done();
    });
  });

  test('should create a new User', (done) => {

    const newUser = new User({
      firstName: 'John',
      lastName: 'Doe',
      job: 'Driver',
      phone: '+61 333 3333'
    });

    newUser.save((err, user) => {
      expect(user.firstName).toBe('John');
      done();
    });
  });

});