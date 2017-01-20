const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// TODO: expectedFinish virtual implementation
// TODO: requried fields and validation
// TODO: it should have notifications

const StudentSchema = new Schema({
  CNP: String,
  username: String,
  password: String,
  email: String,
  firstname: String,
  lastname: String,
  gender: String,
  phone: Number,
  dateOfBirth: Date,
  countyOfOrigin: String,
  militaryStatus: String,
  maritalStatus: String,
  nationality: String,
  bankAccount: String,
  identificationNumber: {
    type: Number,
    unique: true,
  },
  groupID: {
    type: Schema.Types.ObjectId,
    ref: 'group',
  },
  grades: [{
    type: Schema.Types.ObjectId,
    ref: 'grade',
  }],
  attendance: [{
    type: Schema.Types.ObjectId,
    ref: 'attendance',
  }],
});

const Student = mongoose.model('student', StudentSchema);
module.exports = Student;
