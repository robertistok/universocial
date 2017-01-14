const fs = require('fs');
const counties = require('./counties.json');

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

validateCnpContent("1940128261986");

module.exports = {
  extractFromCnp,
  validateCnpFormat,
  validateCnpContent
}
