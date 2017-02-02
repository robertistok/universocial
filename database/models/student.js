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
  group: {
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

StudentSchema.virtual('gpa').
  get(function() {
    let totalCredits = 0;
    return this.grades
      .sort((a, b) => a.course.code - b.course.code)
      .reduce((gpa, item) => {
        console.log(totalCredits);
        const year = `year${item.course.year}`;
        const semester = `semester${item.course.semester}`;
        const { credits } = item.course;
        const { code } = item.course;
        const { grade } = item;
        totalCredits += credits;

        if (!gpa[year]) {
          gpa[year] = {};
        }

        if (!gpa[year][semester]) {
          gpa[year][semester] = {
            gpa: 0,
            credits: 0,
            examsLeft: [],
          };
        }

        if (grade < 5) {
          gpa[year][semester].examsLeft.push(code);
        } else {
          gpa[year][semester].credits += credits;
          gpa[year][semester].gpa += grade * credits;
        };

        if (totalCredits === 30) {
          gpa[year][semester].gpa /= 30;
          totalCredits = 0;
        }

        return gpa;
      }, {});
  })

const Student = mongoose.model('student', StudentSchema);
module.exports = Student;
