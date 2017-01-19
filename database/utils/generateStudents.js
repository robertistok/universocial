const { createStudent } = require('./createEntity');
const fs = require('fs');

const autEng = require('./studentsParsed/autEng.json');

function generateGroup() {
  let students = [];

  autEng.map(student => {
    const { firstname, lastname, gender, studentNumber, fullYear } = student;
    students.push(createStudent(firstname, lastname, gender, studentNumber, fullYear))
  });
  // Object.keys(autEng).map((key) => {
  //   let group = autEng[key].map((student) => {
  //     const { firstname, lastname, gender, studentNumber, fullYear } = student;
  //     autEngNew.push(createStudent(firstname, lastname, gender, studentNumber, key, fullYear))
  //   });
  //   return group;
  // });
  console.log(students);
  return students;
}


let students = generateGroup();
fs.writeFile('students.json', JSON.stringify(students, null, 4), (err) => {if(err) throw err});
