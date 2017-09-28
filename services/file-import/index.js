const fs = require('fs');
const csv = require('csv');
const tmp = require('tmp');
const streamifier = require('streamifier');

const mysqlDb = require('./../../models');
const mongoDbUser = require('./../../documents/user');
const mysqlUser = mysqlDb.user;

const actions = {
  save(req) {
    return new Promise((resolve, reject) => {
      tmp.file({postfix: '.csv', keep: true}, (err, path, fd, cleanupCallback) => {
        if (err) throw err;

        if (req.file && req.file.buffer) {
          const data = streamifier.createReadStream(req.file.buffer);
          const writeStream = fs.createWriteStream(path);
          const readStream = fs.createReadStream(path);

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
              });

            // save to mongoDB
            let user = new mongoDbUser(data);
            user.save((err, data) => {
              if (err) {
                throw new Error(err);
              }

              return data;
            })
          });

          data.pipe(writeStream);
          readStream.pipe(parser).pipe(transform);

          writeStream.on('error', (err) => {
            reject(err);
            cleanupCallback();
          });

          readStream.on('error', (err) => {
            reject(err);
            cleanupCallback();
          }).on('end', () => {
            resolve();
            cleanupCallback();
          });
        } else {
          reject('File not found')
        }
      });
    });
  },
};

module.exports = actions;
