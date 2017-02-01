/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
const counties = require('../data/newCounties.json');

function generateCounty() {
  const countiesToChoose = ['Iași', 'Bacău', 'Suceava', 'București',
    'Covasna', 'Harghita', 'Brașov', 'Bihor',
    'Sibiu', 'Alba', 'Satu Mare', 'Sălaj',
    'Maramureș', 'Mureș', 'Cluj', 'Timiș'];
  const randomNumber = Math.floor(Math.random() * countiesToChoose.length);

  return countiesToChoose[randomNumber];
}

/* eslint-disable no-param-reassign */
/*  necessary for the reduce function*/
function generateControlNumber(cnp) {
  const controlNumberHelper = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
  const cnpSplitted = cnp.slice(0, 12).split('');
  let controlNumber = cnpSplitted.reduce((final, number, index) => {
    final += number * controlNumberHelper[index];
    if (index === 11) final %= 11;
    return final;
  }, 0);
  controlNumber = controlNumber === 10 ? 1 : controlNumber;
  return controlNumber;
}

function generateCnp(gender, fullYear) {
  if (gender !== 'male' && gender !== 'female') {
    console.error('For the god sake enter a valid gender...');
  }

  if (fullYear < 1990 && fullYear > 2005) {
    console.error('Please live in the present..');
  }

  const thirtyDays = [4, 6, 9, 11];
  const thirtyOneDays = [1, 3, 5, 7, 8, 10, 12];
  let genderIndex = 0;

  // const before2K = (fullYear.toString().slice(2, 4) == 19);
  const year = fullYear.toString().slice(2, 4);
  let yearBefore = parseInt(year) - 1;
  let yearAfter = parseInt(year) + 1;

  if (year === '00') {
    yearBefore = '99';
    yearAfter = '01';
  } else if (year === 99) {
    yearAfter = '00';
  }

  let randomYear = Math.random();
  let randomMonth = Math.round((Math.random() * 11) + 1);
  let randomDay = 0;

  const county = generateCounty();
  let countyCode = counties
                    .filter(c => c.county === county)
                    .map(c => c.code);

  countyCode = countyCode < 10 ? `0${countyCode}` : countyCode.toString();

  let randomThreeNumber = Math.round(Math.random() * 999).toString();
  if (randomThreeNumber < 10) randomThreeNumber = `00${randomThreeNumber}`;
  else if (randomThreeNumber < 100) randomThreeNumber = `0${randomThreeNumber}`;

  if (thirtyDays.indexOf(randomMonth) > -1) {
    randomDay = Math.round(Math.random() * 30);
  } else if (thirtyOneDays.indexOf(randomMonth) > -1) {
    randomDay = Math.round(Math.random() * 31);
  } else {
    randomDay = Math.round(Math.random() * 28);
  }

  if (randomDay < 10) randomDay = `0${randomDay.toString()}`;
  if (randomMonth < 10) randomMonth = `0${randomMonth.toString()}`;

  if (randomYear <= 0.05) {
    randomYear = yearAfter;
  } else if (randomYear <= 0.2) {
    randomYear = yearBefore;
  } else {
    randomYear = year;
  }

  if (randomYear >= 100) randomYear = randomYear.toString().slice(1, 3);

  if (randomYear > 90) {
    genderIndex = gender === 'male' ? 1 : 2;
  } else {
    genderIndex = gender === 'male' ? 5 : 6;
  }

  const cnp = `${genderIndex}${randomYear}${randomMonth}${randomDay}${countyCode}${randomThreeNumber}`;

  const controlNumber = generateControlNumber(cnp);

  return `${cnp}${controlNumber}`;
}

function extractFromCnp(cnp) {
  const genderIndex = parseInt(cnp.slice(0, 1), 10);
  const birthYear = parseInt(cnp.slice(1, 3), 10);
  const birthMonth = parseInt(cnp.slice(3, 5), 10);
  const birthDay = parseInt(cnp.slice(5, 7), 10);

  const before2K = !!((genderIndex === 1 || genderIndex === 2));
  const century = before2K ? 19 : 20;
  const birthYearFull = parseInt(`${century}${birthYear}`, 10);

  const birthDate = new Date(Date.UTC(birthYearFull, birthMonth - 1, birthDay));
  birthDate.setTime(birthDate.getTime());

  const isMale = (genderIndex === 1) || (genderIndex === 5);
  const gender = isMale ? 'male' : 'female';

  const countyIndex = parseInt(cnp.slice(7, 9), 10);

  // /console.log(countyIndex, cnp);
  const county = counties.filter(c => c.code === countyIndex);
  return {
    countyOfBirth: county[0].county,
    gender,
    dateOfBirth: birthDate,
  };
}

function validateCnpFormat(cnp) {
  if (cnp.length !== 13) {
    console.error('The CNP must be 13 characters length!!');
    return false;
  }

  if (!(/^\d+$/.test(cnp))) {
    console.error('The CNP must contain only numbers!!');
    return false;
  }

  return true;
}

function validateCnpContent(cnp) {
  const genderIndexValue = [1, 2, 5, 6];
  const genderIndex = parseInt(cnp.slice(0, 1), 10);
  const birthMonth = parseInt(cnp.slice(3, 5), 10);
  const birthDay = parseInt(cnp.slice(5, 7), 10);

  if (genderIndexValue.indexOf(genderIndex) === -1) {
    console.error('Genderindex must be 1, 2, 5 or 6!!');
    return false;
  }

  if (birthMonth > 12) {
    console.error(`The month of the birthdate must be between 1 and 12 and you entered ${birthMonth}`);
    return false;
  }

  if (birthDay > 31) {
    console.error(`The day of the birthdate must be between 1 and 31 and you entered ${birthDay}`);
    return false;
  }

  return true;
}


module.exports = {
  generateCnp,
  extractFromCnp,
  validateCnpFormat,
  validateCnpContent,
};
