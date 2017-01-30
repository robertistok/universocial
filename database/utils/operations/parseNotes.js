const fs = require('fs');
const csv = require('fast-csv');

const stream = fs.createReadStream('../data/clean.csv');

const notes = [];

function sumGrades(data) {
  if (data['disciplina obligatorie'].includes('matematica t1')) {
    let grade = data['nota finala - disciplina obligatorie'];
    grade = parseInt(grade, 10);
    if (grade < 4 || isNaN(grade)) return;
    if (!notes[grade]) {
      notes[grade] = 1;
    } else {
      notes[grade] += 1;
    }
  }
}

function listGrades(data) {
  if (data['disciplina obligatorie'].includes('matematica t1')) {
    let grade = data['nota finala - disciplina obligatorie'];
    grade = parseInt(grade, 10);
    if (grade >= 4 && !isNaN(grade)) notes.push(grade);
  }
}

csv
.fromStream(stream, {
  headers: true,
  strictColumnHandling: true,
})
.on('data', listGrades)
.on('finish', () => {
  fs.writeFile('../data/listedGrades.json', JSON.stringify(notes, null, 4), (err) => { if (err) throw err; });
});
