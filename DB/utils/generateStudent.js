function createStudent(CNP, startYear) {
  let expectedFinish = startYear + 4;
  let subjects = [];

  for(let y = 2013; y < expectedFinish; y++) {
    subjects.push({
      year: `${y} - ${y+1}`
    })
  }

  let student = {
    CNP,
    academicData: {
      startYear,
      expectedFinish,
      subjects
      }
    };

  return student;
}

module.exports = createStudent;
