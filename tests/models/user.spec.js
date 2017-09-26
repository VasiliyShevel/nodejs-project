const User = require('../../models/user');

describe('Test user document', function() {

  beforeAll((done) => {
    mongoose.connect('mongodb://localhost/generated_data', {
      useMongoClient: true,
    });
    mongoose.connection.once('open', () => {
      done();
    })
  });

  test('should create a new User', (done) => {

    const newUser = new User({
      firstName: 'John',
      lastName: 'Doe',
      job: 'Driver',
      phone: '+61 333 3333'
    });

    newUser.save((err, result) => {
      expect(result.firstName).toBe('John');
      done();
    });
  });

  afterAll((done) => {
    mongoose.disconnect(() => {
      done();
    });
  });

});