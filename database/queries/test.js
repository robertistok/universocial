const mongoose = require('mongoose');
const Student = require('../models/student');
const Grade = require('../models/grade');
const Course = require('../models/course')

mongoose.Promise = global.Promise;
if (process.NODE_ENV !== 'test') {
  mongoose
    .connect('mongodb://localhost/universocial', {
      server: {
        socketOptions: {
          socketTimeoutMS: 0,
          connectTimeoutMS: 0
        }
      }
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));
}

Student.findOne({ identificationNumber: 21021658 })
  .populate({
    path: 'grades',
    populate: {
      path: 'course',
      model: 'course',
    }
  })
  .then((student) => {
    console.log(student.perf);
  })
