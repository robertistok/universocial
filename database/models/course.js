const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  code: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    min: [1, "Too low. Enter a value between 1 and 4"],
    max: [4, "Too high. Enter a value between 1 and 4"],
    required: true
  },
  semester: {
    type: Number,
    min: [1, "There exist only semester 1 and 2, you entered a lover value"],
    max: [2, "There exist only semester 1 and 2, you entered a higher value"],
    required: true
  },
  lecturePerWeek: Number,
  seminarsPerWeek: Number,
  labsPerWeek: Number,
  projectsPerWeek: Number,
  credits: Number,
  teachers: [{
    lecture: {
      type: Schema.Types.ObjectId,
      ref: 'teacher'
    },
    seminar: {
      type: Schema.Types.ObjectId,
      ref: 'teacher'
    },
    lab: {
      type: Schema.Types.ObjectId,
      ref: 'teacher'
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'teacher'
    }
  }],
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'group'
  }]
})

const Course  = mongoose.model('course', CourseSchema);
module.exports = Course;
