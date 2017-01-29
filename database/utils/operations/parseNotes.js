const fs = require('fs');
const csv = require('fast-csv');

const stream = fs.createReadStream('../data/clean.csv');

const notes = {};

csv
 .fromStream(stream, {
   headers: true,
   strictColumnHandling: true,
 })
 .on('data', (data) => {
   if (data['disciplina obligatorie'].includes('matematica t1')) {
     let grade = data['nota finala - disciplina obligatorie'];
     grade = parseInt(grade, 10);
     if (grade < 3 || isNaN(grade)) return;
     if (!notes[grade]) {
       notes[grade] = 1;
     } else {
       notes[grade] += 1;
     }
   }
 })
 .on('finish', () => {
   fs.writeFile('../data/grades.json', JSON.stringify(notes, null, 4), (err) => { if (err) throw err; });
 });
