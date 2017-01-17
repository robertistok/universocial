const createStudent = require('./createStudent');
const fs = require('fs');

const autEng30311 = require('./studentsParsed/autEng30311');
const autEng30312 = require('./studentsParsed/autEng30312');

function generateEng() {
  let autEng = {};
  let autEngNew = [];
  let students = [];
  autEng['30311'] = autEng30311;
  autEng['30312'] = autEng30312;

  Object.keys(autEng).map((key) => {
    let group = autEng[key].map((student) => {
      const { firstname, lastname, gender, studentNumber, fullYear } = student;
      autEngNew.push(createStudent(firstname, lastname, gender, studentNumber, key, 2016, fullYear))
    });
    return group;
  });

  return autEngNew;
}

//let students = generateEng();
//fs.writeFile('students.json', JSON.stringify(students, null, 4), (err) => {if(err) throw err});
