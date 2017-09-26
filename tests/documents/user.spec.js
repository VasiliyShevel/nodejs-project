const  mongoose = require('mongoose');

const User = require('../documents/user');

describe('Test mongoDB user model', function() {

  before(
    mongoose.connect('mongodb://localhost/generated_data')
  );

  // beforeEach(testUtils.clear);

  describe('create new User', function() {
    it('should create a new Example', function(done) {

      const newUser = new User({
        firstName: 'John',
        lastName: 'Doe',
        job: 'Driver',
        phone: '+61 333 3333'
      });

      newUser.save(function(err, result) {
        expect(result.firstName).toBe('John');
        done();
      });
    });
  });

  after(
    mongoose.disconnect()
  );

});