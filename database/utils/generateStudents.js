const { createStudent } = require('./createEntity');
const fs = require('fs');

const autEng = require('./studentsParsed/autEng.json');

function generateStudents() {
  const students = [];

  autEng.map((student) => {
    const { firstname, lastname, gender, studentNumber, fullYear } = student;
    return students.push(createStudent(firstname, lastname, gender, studentNumber, fullYear));
  });
  return students;
}

function generateGroup() {
  const numofGroups = 8;
  const groups = [];
  let avarageBirthYear = 1997;
  let startYear = 2016;

  for (let i = 0; i < numofGroups; i += 1) {
    let groupNumber;
    if (i % 2 === 0) {
      groupNumber = 1;
      if (i !== 0) {
        startYear -= 1;
        avarageBirthYear -= 1;
      }
    } else {
      groupNumber = 2;
    }

    const group = {
      id: `${30}${22}${startYear % 2000}${groupNumber}`,
      startYear,
      avarageBirthYear,
    };

    groups.push(group);
  }

  return groups;
}

const groups = generateGroup();
console.log(groups);

const students = generateStudents();
fs.writeFile('students.json', JSON.stringify(students, null, 4), (err) => { if (err) throw err; });
