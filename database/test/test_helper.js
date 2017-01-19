const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/universocial');
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

const { students, grades, groups, teachers } = mongoose.connection.collections;
let promises = [students, grades, groups].map(collection => {
  return new Promise((resolve, reject) => {
    collection.drop(err => {
      if (err) return reject(err);
      resolve();
    });
  });
});

beforeEach((done) => {
  Promise.all(promises)
    .then(() => done());
});


// beforeEach((done) => {
//   students.drop(() => {
//     grades.drop(() => {
//         done();
//     })
//   });
// });
