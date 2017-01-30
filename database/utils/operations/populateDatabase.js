const mongoose = require('mongoose');
const courses = require('../data/courses.json');
const groupsAut = require('../data/groupsAut.json');
const studentsAut = require('../data/studentsAut.json');
const grades = require('../data/listedGrades.json');

const Course = require('../../models/course');
const Group = require('../../models/group');
const Student = require('../../models/student');
const Grade = require('../../models/grade');

mongoose.Promise = global.Promise;
if (process.NODE_ENV !== 'test') {
  mongoose
    .connect('mongodb://localhost/universocial')
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));
}

// const courseModels = [];

function generateCourses() {
  courses.map(courseProps => {
    const course = new Course(courseProps);
    courseModels.push(course);
    course.save();
  });
}

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

function associateCoursesWithGroups() {
  Group.find({})
    .then(groups => {
      groups.map(group => {
        const year = 2017 - group.startYear;
        const filteredCourses = courseModels.filter(c => c.year === year);
        group.courses = filteredCourses;
        group.save();
      })
    });
};

function generateGradesFor(course) {
  Group.find({})
    .populate('students')
    .then(groups => {
      groups.map(group => {
        const randomIndex = Math.round(Math.random() * grades.length) + 1;
        const year = 2017 - group.startYear;
        if (course.year > year) return;
        group.students.map((student, i) => {
          const grade = new Grade({
            grade: grades[randomIndex + i],
            course: course,
            student: student._id,
          });
          student.grades.push(grade);
          grade.save();
          student.save();
        })
      })
    });
}

function generateGrades() {
  Course.find({})
    .then(courses => {
      courses.map(generateGradesFor);
    });
};

generateGrades();

// populateStudentsAndAssociateWithGroups(studentsAut.ro, groupsAut.ro, 27);
// populateStudentsAndAssociateWithGroups(studentsAut.eng, groupsAut.eng, 28);
