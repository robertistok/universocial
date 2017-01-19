const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: it should have students, teachers, courses
// TODO: no attendance, the teachers have them, we can refernce it in the future
// TODO: it should include notificationss

const GroupSchema = new Schema({
  id: String,
  startYear: Number,
  avarageBirthYear: Number,
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'student'
  }],
  teachers: [{
    type: Schema.Types.ObjectId,
    ref: 'teacher'
  }],
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'course'
  }]
});

const Group = mongoose.model('group', GroupSchema);
module.exports = Group;
