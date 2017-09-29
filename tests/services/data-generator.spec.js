const faker = require('faker');
const csv = require('fast-csv');
const fs = require('fs');

const filePath = __dirname + '/data';

describe('Test csv file creation', () => {
  const fileName = 'test';

  beforeEach((done) => {
    fs.unlink(`${filePath}/${fileName}.csv`, () => {
      done();
    });
  });

  it('Should create a new csv file', (done) => {
    const result = [];

    const fileStream = fs.createWriteStream(`${filePath}/${fileName}.csv`);

    for (let i = 0; i < 10; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const phone = faker.phone.phoneNumber();
      const job = faker.name.jobTitle();

      result.push({firstName, lastName, phone, job});
    }

    csv.write(result, {
      headers: true
    })
      .pipe(fileStream);

    fileStream.on('close', () => {
      fs.stat(`${filePath}/${fileName}.csv`, (err, stat) => {
        expect(Boolean(stat)).toBe(true);
        done();
      });
    });
  });
});
