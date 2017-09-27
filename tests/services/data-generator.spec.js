const faker = require('faker');
const json2csv = require('json2csv');
const fs = require('fs');

describe('Test csv file creation', () => {
  const fileName = 'test';

  beforeEach((done) => {
    fs.unlink(`./data/${fileName}.csv`, () => {
      done();
    });
  });

  it('Should create a new csv file', (done) => {
    const result = [];
    const fields = ['firstName', 'lastName', 'phone', 'job'];

    for (let i = 0; i < 10; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const phone = faker.phone.phoneNumber();
      const job = faker.name.jobTitle();

      result.push({firstName, lastName, phone, job});
    }

    const csv = json2csv({ data: result, fields: fields });

    fs.writeFile(`./data/${fileName}.csv`, csv, () => {
      fs.stat(`./data/${fileName}.csv`, (err, stat) => {
        expect(Boolean(stat)).toBe(true);
        done();
      });
    });
  });
});
