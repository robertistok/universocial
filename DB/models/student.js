const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  CNP: String,
  username: String,
  password: String,
  email:    String,

  identificationData: {
    firstname: String,
    lastname:  String,
    gender: String,
    phone: Number,
    dateOfBirth: Date,
    countyOfOrigin: String
    identityCard: {
      type: String,
      series: Number,
    },
    other: {
      militaryStatus: String,
      maritalStatus: String,
      nationality: String,
      bankAccount: String
    }
  },

  academicData: {
    faculty: String,
    specialization: String,
    startYear: Number,
    expectedFinish: Number,
    currentYear: { type: Number, "default": 1},
    groupID: Number,
    subjects: { type: Array, "default": [] }
  }
})

const Student = mongoose.model('student', StudentSchema);
module.exports = Student;
