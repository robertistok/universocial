const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  code: Number,
  name: String,
  year: Number, //TO-DO: VALIDATION
  semester: Number //TO-DO: VALIDATION
  lecturePerWeek: Number,
  seminarsPerWeek: Number,
  labsPerWeek: Number,
  projectsPerWeek: Number,
  credits: Number,
  teachers: [{
    lecture: { }, //TO-DO: REFERENCE
    seminar: { }, //TO-DO: REFERENCE
    lab: { }, //TO-DO: REFERENCE
    project: { } //TO-DO: REFERENCE
  }]
})

const Course  = mongoose.model('course', CourseSchema);
module.exports = Course;
