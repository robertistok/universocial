/* eslint max-len: ["error", 120] */
const { createStudent } = require('./createEntity');
const fs = require('fs');

const autEng = require('../studentsParsed/autEng.json');
const autRo = require('../studentsParsed/autRo.json');

function generateStudents(group) {
  const students = [];

  group.map((data) => {
    const { firstname, lastname, gender, studentNumber, fullYear } = data;
    const student = createStudent(firstname, lastname, gender, studentNumber, fullYear);
    return students.push(student);
  });
  return students;
}

function generateGroup(numofGroups, seriesCode) {
  let groupNumber;
  let avarageBirthYear = 1998;
  let startYear = 2017;
  const splitFlag = numofGroups / 4;
  const groups = [];

  for (let i = 0; i < numofGroups; i += 1) {
    if (i % splitFlag === 0) {
      groupNumber = 1;
      avarageBirthYear -= 1;
      startYear -= 1;
    } else {
      groupNumber += 1;
    }

    const group = {
      id: `${30}${seriesCode}${startYear % 2000}${groupNumber}`,
      startYear,
      avarageBirthYear,
    };

    groups.push(group);
  }

  return groups;
}

const groups = {};
groups.ro = generateGroup(24, 21);
groups.eng = generateGroup(8, 22);

const studentsAut = {};
studentsAut.ro = generateStudents(autRo);
studentsAut.eng = generateStudents(autEng);

console.log(studentsAut.ro.length);

fs.writeFile('../data/groupsAut.json', JSON.stringify(groups, null, 4), (err) => { if (err) throw err; });
fs.writeFile('../data/studentsAut.json', JSON.stringify(studentsAut, null, 4), (err) => { if (err) throw err; });
