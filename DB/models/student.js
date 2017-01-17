const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  CNP: String,
  username: String,
  password: String,
  email:    String,
  firstname: String,
  lastname:  String,
  gender: String,
  phone: Number,
  dateOfBirth: Date,
  countyOfOrigin: String,
  militaryStatus: String,
  maritalStatus: String,
  nationality: String,
  bankAccount: String
  ,
  academicData: {
    studentNumber: Number,
    groupID: Number,
    faculty: String,
    specialization: String,
    startYear: Number,
    currentYear: { type: Number, "default": 1},
    grades: [{
      type: Schema.Types.ObjectId,
      ref: 'grades'
    }]
  }
});

// TO-DO: expectedFinish virtual implementation

const Student = mongoose.model('student', StudentSchema);
module.exports = Student;
