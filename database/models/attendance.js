const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: implementation
// TODO: similar to grades, possible side grades with message

const AttendanceSchema = new Schema({

});

const Attendance = mongoose.model('attendance', AttendanceSchema);
module.exports = Attendance;
