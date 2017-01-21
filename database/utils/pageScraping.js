/* eslint import/no-unresolved: [2, { commonjs: true }]*/
const fs = require('fs');
const Xray = require('x-ray');
const { autEngHtml, autRoHtml } = require('./studentsHtml/oneLineHtmls');

const x = Xray();

// regex = (<td>)\d{1,2}(</td>)
const autGroup = [];
let fullYear = 1997;

autRoHtml.map((group) => {
  x(group, 'table', ['tr'])((err, content) => {
    const data = content;
    data.map(d => d.trim())
        .map((student) => {
          const splitData = student.split(' ');
          if (autGroup.length >= 160 && autGroup.length % 160 === 0) fullYear -= 1;
          return autGroup.push({
            // index: autGroup.length,
            firstname: splitData[1],
            lastname: splitData[3],
            gender: splitData[0],
            fullYear,
            studentNumber: splitData.pop(),
          });
        });
  });
  return true;
});

console.log(autGroup.length);

fs.writeFile('studentsParsed/autRo.json', JSON.stringify(autGroup, null, 4), (err) => { if (err) throw err; });
