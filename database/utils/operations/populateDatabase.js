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
    .connect(process.env.MONGOLAB_URI)
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));
}

// 1. This is the first step in populating the database
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

// 2. This is the second step in populatin the databse
const courseModels = [];
function generateCourses() {
  courses.map(courseProps => {
    const course = new Course(courseProps);
    courseModels.push(course);
    course.save();
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

// 3. This is the third step in populating the database
function populateGrades() {
  Course.find({})
  .then(courses => {
    courses.map(generateGradesFor);
  });
};

let index = Math.round(Math.random() * 9876 + 1);
function generateGrade(course, student) {
  const { code } = course;
  let grade;
  const probability = Math.random();

  if ([8, 15, 43].indexOf(code) > -1) {
    // Sport I and II, Practical Placement
    // TOTAL = 3
    grade = probability >= 0.02 ? 10 : 4;
  } else if ([7, 14, 22, 29].indexOf(code) > -1) {
    // Foreign Languages I and II
    // English Language (technical writing) I and II
    // TOTAL = 4
    grade = probability <= 0.25 ? 9 : 10;
    grade = probability <= 0.10 ? 8 : grade;
    grade = probability <= 0.06 ? 7 : grade;
    grade = probability <= 0.02 ? 4 : grade;
  } else if ([3, 6, 13, 26, 35, 36, 39, 48.1, 48.2, 49.1, 49.2, 50.1, 50.2].indexOf(code) > -1) {
    // Computer Basics, Physics, Chemistry
    // CAD in automation
    // Economic Law, Management and Communication, Industrial Informatics
    // Electrical Machines and Drives, Man Machine Interaces
    // Microsystems and Data Aquisition, Project Management
    // Marketing, Personal and Professional Development
    // TOTAL = 13
    grade = probability <= 0.60 ? 9 : 10;
    grade = probability <= 0.27 ? 8 : grade;
    grade = probability <= 0.18 ? 7 : grade;
    grade = probability <= 0.13 ? 6 : grade;
    grade = probability <= 0.08 ? 5 : grade;
    grade = probability <= 0.04 ? 4 : grade;
  } else {
    grade = grades[index++];
  }

  const gradeObj = new Grade({
    grade: grade,
    course: course,
    student: student._id,
  });
  return gradeObj;
}

function generateGradesFor(course) {
  Group.find({})
    .skip(16)
    .limit(16)
    .populate('students')
    .then(groups => {
      groups.map(group => {
        const year = 2017 - group.startYear;
        if (course.year > year || (course.semester === 2 && year === course.year)) return;
        group.students.map((student, i) => {
          const grade = generateGrade(course, student)
          student.grades.push(grade);
          Promise.all([grade.save(), student.save()])
            .then(() => { return });
        });
      });
    });
};

// First step in order to genrate the database
// populateStudentsAndAssociateWithGroups(studentsAut.ro, groupsAut.ro, 27);
// populateStudentsAndAssociateWithGroups(studentsAut.eng, groupsAut.eng, 28);


// Second step in generating the database
generateCourses();
associateCoursesWithGroups();

// Third step in generating the database; set the limit and skip in the functions
// populateGrades();
