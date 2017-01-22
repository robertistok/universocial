const mongoose = require('mongoose');
const courses = require('../data/courses.json');
const groupsAut = require('../data/groupsAut.json');
const studentsAut = require('../data/studentsAut.json');

const Course = require('../../models/course');
const Group = require('../../models/group');
const Student = require('../../models/student');

mongoose.Promise = global.Promise;
if (process.NODE_ENV !== 'test') {
  mongoose
    .connect('mongodb://localhost/universocial')
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));
}

courses.map(courseProps => new Course(courseProps).save());

function populateStudentsAndAssociateWithGroups(students, groups, studentsPerGroup) {
  let groupIndex = 0;
  const groupModels = [];

  students.map((studentProps, index) => {
    const student = new Student(studentProps);

    if (index === 0) {
      const newGroup = new Group(groups[groupIndex]);
      groupModels.push(newGroup);
    } else if (index !== 0 && index % studentsPerGroup === 0) {
      groupIndex += 1;
      const newGroup = new Group(groups[groupIndex]);
      groupModels.push(newGroup);
    }

    const currentGroup = groupModels[groupIndex];
    currentGroup.students.push(student);
    student.group = currentGroup;

    currentGroup.save();
    student.save();
  });
}

// populateStudentsAndAssociateWithGroups(studentsAut.ro, groupsAut.ro, 27);
// populateStudentsAndAssociateWithGroups(studentsAut.eng, groupsAut.eng, 28);
