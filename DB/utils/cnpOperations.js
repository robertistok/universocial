const fs = require('fs');
const counties = require('./counties.json');

function generateCnp(gender, fullYear) {
  if (gender !== "male" && gender !== "female") {
    console.error("For the god sake enter a valid gender...");
    return;
  }

  if (fullYear < 1990 && fullYear > 2005) {
    console.error("Please live in the present..");
  }

  let thirtyDays = [4, 6, 9, 11];
  let thirtyOneDays = [1, 3, 5, 7, 8, 10, 12];

  let genderIndex = 0;
  let before2K = (fullYear.toString().slice(2,4) == 19) ? true : false;
  let year = fullYear.toString().slice(2,4);
  let yearBefore = year - 1;
  let yearAfter = year + 1;

  if (year === "00" ) {
    yearBefore = "99";
    yearAfter = "01";
  } else if (year === 99 ) {
    yearAfter = "00";
  }

  let randomYear = Math.random();
  let randomMonth = Math.round(Math.random() * 11 + 1);
  let randomDay = 0;

  if (thirtyDays.indexOf(randomMonth) > -1) {
    randomDay = Math.round(Math.random() * 30);
  } else if (thirtyOneDays.indexOf(randomMonth) > -1) {
    randomDay = Math.round(Math.random() * 31);
  } else {
    randomDay = Math.round(Math.random() * 28);
  }

  if (randomDay < 10) randomDay = "0" + randomDay.toString();
  if (randomMonth < 10) randomMonth = "0" + randomMonth.toString();

  randomYear = randomYear <= 0.05 ? yearAfter : (randomYear <= 0.20 ? yearBefore : year);
  if (randomYear >= 100) randomYear = randomYear.toString().slice(1, 3);

  if (randomYear > 90) {
    genderIndex = gender === "male" ? 1 : 2;
  } else {
    genderIndex = gender === "male" ? 5 : 6;
  }

  return `${genderIndex}${randomYear}${randomMonth}${randomDay}`;
}

let years = {};
for (i=0; i<1000;i++) {
  let year = generateCnp("female", 2000);
  // if (!years[year]) years[year] = 0;
  // years[year]++;
  console.log(year);
}

console.log(years);

function extractFromCnp(cnp) {
  let extracted = {};
  let genderIndex = parseInt(cnp.slice(0,1));
  let birthYear = parseInt(cnp.slice(1, 3));
  let birthMonth = parseInt(cnp.slice(3, 5));
  let birthDay = parseInt(cnp.slice(5, 7));

  let before2K = (genderIndex === 1 || genderIndex === 2) ? true : false;
  let century = before2K ? 19 : 20;
  let birthYearFull = parseInt(`${century}${birthYear}`);

  let birthDate = new Date(Date.UTC(birthYearFull, birthMonth - 1, birthDay));
  birthDate.setTime( birthDate.getTime() );

  let isMale = (genderIndex == 1) || (genderIndex == 5);
  let gender = isMale ? 'male' : 'female';

  let countyIndex = parseInt(cnp.slice(7, 9));
  let county = counties.filter(c => c.code === countyIndex);

  extracted.countyOfBirth = county[0].name;
  extracted.gender = gender;
  extracted.dateOfBirth = birthDate;
  return extracted;
}

function validateCnpFormat(cnp) {
  if (cnp.length !== 13) {
    console.error("The CNP must be 13 characters length!!");
    return false;
  }

  if (!(/^\d+$/.test(cnp))) {
    console.error("The CNP must contain only numbers!!");
    return false;
  }

  return true;
}

function validateCnpContent(cnp) {
  let genderIndexValue = [1, 2, 5, 6];
  let controlNumberHelper = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
  let genderIndex = parseInt(cnp.slice(0,1));
  let birthYear = parseInt(cnp.slice(1, 3));
  let birthMonth = parseInt(cnp.slice(3, 5));
  let birthDay = parseInt(cnp.slice(5, 7));

  if (genderIndexValue.indexOf(genderIndex) === -1) {
    console.error("Genderindex must be 1, 2, 5 or 6!!");
    return false;
  };

  if (birthMonth > 12) {
    console.error(`The month of the birthdate must be between 1 and 12 and you entered ${birthMonth}` );
    return false;
  }

  if (birthDay > 31) {
    console.error('The day of the birthdate must be between 1 and 31 and you entered ${birthDay}');
    return false;
  }

  let cnpSplitted = cnp.slice(0, 12).split('');
  let controlNumber = cnpSplitted.reduce((final, number, index) => {
    final += number * controlNumberHelper[index];
    if (index === 11) final = final % 11;
    return final;
  }, 0);

  if (controlNumber != cnp[12]) {
    console.error("This is not a valid CNP");
    return false;
  }

  return true;
}

module.exports = {
  extractFromCnp,
  validateCnpFormat,
  validateCnpContent
}
