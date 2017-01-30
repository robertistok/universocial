const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GradeSchema = new Schema({
  enteredOn: {
    type: Date,
    default: Date.now,
  },
  enteredFor: {
    type: Date,
    default: Date.now,
    required: true,
  },
  grade: {
    type: Number,
    min: [1, '1 is the minimum grade you can assign'],
    max: [10, '10 is the maximum grade you can assign'],
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
    required: true
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'student',
    required: true,
  },
  assignor: {
    // type: Schema.Types.ObjectId,
    // ref: 'teacher',
    type: String,
    default: 'sysadmin',
    required: true,
  },
  type: {
    type: String,
    default: 'lecture',
    required: true,
    validate: {
      validator: type => ['lecture', 'lab', 'project', 'seminar'].indexOf(type) > -1,
      message: 'You can only assign a grade of type lecture, lab, project or seminar',
    },
  },
});

const Grade = mongoose.model('grade', GradeSchema);
module.exports = Grade;
