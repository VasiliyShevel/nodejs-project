const faker = require('faker');
const json2csv = require('json2csv');
const fs = require('fs');

const actions = {
  generateFile(data) {
    return new Promise((resolve, reject) => {
      const result = [];
      const fields = ['firstName', 'lastName', 'phone', 'job'];

      if (data.rows) {
        for (let i = 0; i < data.rows; i++) {
          const firstName = faker.name.firstName();
          const lastName = faker.name.lastName();
          const phone = faker.phone.phoneNumber();
          const job = faker.name.jobTitle();

          result.push({firstName, lastName, phone, job});
        }

        const csv = json2csv({ data: result, fields: fields });
        const fileName = Math.random().toString(36);

        fs.writeFile(`./data/${fileName}.csv`, csv, function(err) {
          if (err) reject(err);
          resolve();
        });
      } else {
        reject('Bad request');
      }
    })
  },
};

module.exports = actions;
