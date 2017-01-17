const assert = require('assert');
const Student = require('../models/student');
const Grade = require('../models/grade');

const createStudent = require('../utils/createStudent');

describe('Creating students', () => {
  beforeEach((done) => {
    let robi = new Student(createStudent('Robert', 'Istok', 'male', '12345678', '30342', 2013, 1994));
    let robi2 = new Student(createStudent('Robert2', 'Istok', 'male', '12345678', '30342', 2013, 1994));
    let dcs = new Grade({});
    let dcs2 = new Grade({});
    dcs.student = robi;
    dcs2.student = robi2;
    robi.academicData.grades.push(dcs);

    Promise.all([robi.save(), robi2.save(), dcs.save(), dcs2.save()])
      .then(() => done())
      .catch(err => console.log(err.errors));
  })

  it('tests if working', (done) => {
    Student.findOne({ firstname: 'Robert' })
      .then((user) => {
        console.log(user);
        assert(user.firstname === 'Robert')
        done();
      });
  });

  it('checks for association', (done) => {
    let robi;
    Student.findOne({ firstname: 'Robert2' })
      .then((user) => {
        robi = user;
      }).then(() => {
        Grade.findOne({ student: robi._id })
          .populate({
            path: 'student',
            model: 'student'
          })
          .then((grade) => {
            console.log(grade);
            done();
          });
      });
  })
});
