const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GradeSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  grade: {
    type: Number,
    //required: true,
    min: [1, '1 is the minimum grade you can assign'],
    max: [10, '10 is the maximum grade you can assign']
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
    //required: true
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'student',
    required: true
  },
  assignor: {
    type: Schema.Types.ObjectId,
    ref: 'teacher',
    //required: true
  },
  // type: {
  //   type: String,
  //   required: true,
  //   validate: {
  //     validator: (type) => ['lecture, lab, project, seminar'].indexOf(type) > -1,
  //     message: 'You can only assign a grade of type lecture, lab, project or seminar'
  //   }
  // }
});

const Grade = mongoose.model('grade', GradeSchema);
module.exports = Grade;
