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
    .connect('mongodb://localhost/universocial', {
      server: {
        socketOptions: {
          socketTimeoutMS: 0,
          connectTimeoutMS: 0
        }
      }
})
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));
}

const courseModels = [];

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

let index = 0;
function generateGradesFor(course) {
  Group.find({})
    .skip(0)
    .limit(16)
    .populate('students')
    .then(groups => {
      groups.map(group => {
        const year = 2017 - group.startYear;
        if (course.year > year || (course.semester === 2 && year === course.year)) return;
        group.students.map((student, i) => {
          const grade = new Grade({
            grade: grades[index++],
            course: course,
            student: student._id,
          });
          student.grades.push(grade);
          Promise.all([grade.save(), student.save()])
            .then(() => { return });
        });
      });
    });
};

function generateGrades() {
  Course.find({})
    .then(courses => {
      courses.map(generateGradesFor);
    });
};

// First step in order to genrate the database
// populateStudentsAndAssociateWithGroups(studentsAut.ro, groupsAut.ro, 27);
// populateStudentsAndAssociateWithGroups(studentsAut.eng, groupsAut.eng, 28);


// second step in generating the database
// generateCourses();
// associateCoursesWithGroups();

// third step in generating the database; set the limit and skip in the functions
generateGrades();
