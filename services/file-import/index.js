const fs = require('fs');
const csv = require('csv');
const tmp = require('tmp');

const mysqlDb = require('./../../models');
const mongoDbUser = require('./../../documents/user');
const mysqlUser = mysqlDb.user;

const actions = {
  save(file) {
    return new Promise((resolve, reject) => {
      tmp.file({postfix: '.csv', keep: true}, (err, path, fd, cleanupCallback) => {
        if (err) throw err;

        const buffer = new Buffer(file.buffer);

        fs.writeFile(path, buffer, () => {
          const inputFile = fs.createReadStream(path);
          const parser = csv.parse({
            columns: true
          });

          const transform = csv.transform((row) => {
            const data = {
              firstName: row['firstName'],
              lastName: row['lastName'],
              phone: row['phone'],
              job: row['job'],
            };

            // save to mysql database
            mysqlUser.create(data)
              .then(() => {
                return true;
              })
              .catch((err) => {
                throw new Error(err);
              })

            // save to mongoDB
            let user = new mongoDbUser(data);
            user.save((err, data) => {
              if (err) {
                throw new Error(err);
              }

              return data;
            })
          });

          inputFile.pipe(parser).pipe(transform);

          inputFile.on('end', () => {
            resolve();
            cleanupCallback();
          });
          inputFile.on('error', (err) => {
            reject(err);
            cleanupCallback();
          })
        });
      });

    });
  },
};

module.exports = actions;
