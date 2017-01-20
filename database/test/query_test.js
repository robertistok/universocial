const assert = require('assert');
const Student = require('../models/student');
const Grade = require('../models/grade');
const Course = require('../models/course');
const Teacher = require('../models/teacher');
const Group = require('../models/group');

const { createStudent, createTeacher } = require('../utils/createEntity');

describe('Queries testing', () => {
  let robi,
    dcs,
    autEngForth,
    szilard;

  before((done) => {
    robi = new Student(createStudent('Robert', 'Istok', 'male', '12345678', autEngForth, 2013, 1994));
    dcs = new Grade({});
    szilard = new Teacher({});
    autEngForth = new Group({
      id: 30311,
    });
    autEngForth.students.push(robi);
    autEngForth.teachers.push(szilard);

    dcs.student = robi;
    robi.grades.push(dcs);

    Promise.all([robi.save(), dcs.save(), autEngForth.save(), szilard.save()])
      .then(() => done())
      .catch(err => console.log(err.errors));
  });

  it('finds a student', (done) => {
    Student.findOne({ firstname: 'Robert' })
      .then((user) => {
        assert(user.firstname === 'Robert');
        done();
      });
  });

  it('finds and populates a group', (done) => {
    Group.findOne({ id: 30311 })
      .populate([{
        path: 'students',
        populate: 'student',
      },
      {
        path: 'teachers',
        populate: 'teacher',
      }])
      .then((group) => {
        console.log(group);
        // assert(group.students[0].firstname === "Robert");
        done();
      });
  });

  it('checks for correct student and grade association', (done) => {
    Student.findOne({ })
      .then((user) => {
        Grade.findOne({ student: user._id })
          .populate('student')
          .then((grade) => {
            assert(grade.equals(dcs));
            done();
          });
      });
  });
});
