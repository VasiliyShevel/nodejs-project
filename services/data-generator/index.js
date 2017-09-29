const faker = require('faker');
const csv = require('fast-csv');
const fs = require('fs');

const config = require('../../config/app')

const actions = {
  generateFile(data) {
    return new Promise((resolve, reject) => {
      const result = [];
      const fileName = Math.random().toString(36);
      const filepath = `${config.filesDir}/${fileName}.csv`;

      if (data.rows) {
        const fileStream = fs.createWriteStream(filepath);

        for (let i = 0; i < data.rows; i++) {
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

        fileStream.on('error', (err) => {
          reject(err);
        }).on('close', () => {
          resolve();
        });

      } else {
        reject('Bad request');
      }
    })
  },
};

module.exports = actions;
