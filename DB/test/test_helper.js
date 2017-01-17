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

  beforeEach((done) => {
    mongoose.connection.collections.students.drop(() => {
      //ready to run the next test!
      done();
    });
  })

beforeEach((done) => {
  const { students, grades} = mongoose.connection.collections;
  students.drop(() => {
    grades.drop(() => {
        done();
    })
  });
});
