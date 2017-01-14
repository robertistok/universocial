const assert = require('assert');
const Student = require('../models/student');

const createStudent = require('../utils/generateStudent');
const counties = require('../utils/counties.json');

describe('Creating students', () => {
  let robi = new Student(createStudent('1940705080018', 2013));

  it('saves the student to the database', (done) => {
    robi.save()
      .then(() => {
        assert(!robi.isNew);
        done();
      });
  });
});
