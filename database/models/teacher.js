const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  CNP: String,
  username: String,
  password: String,
  email: String,
  firstname: String,
  lastname: String,
  gender: String,
  phone: Number,
  dateOfBirth: Date,

  identificationNumber: Number,
  classes: [{
    group: {
      type: Schema.Types.ObjectId,
      ref: 'group',
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: 'course',
    },
    type: {
      type: String,
      validate: {
        validator: type => ['lecture, lab, project, seminar'].indexOf(type) > -1,
        message: 'You can only assign a teacher the following type of teachings: lecture, lab, project or seminar',
      },
    },
    attendance: {
      type: Schema.Types.ObjectId,
      ref: 'attendance',
    },
  }],
});

const Teacher = mongoose.model('teacher', TeacherSchema);
module.exports = Teacher;
