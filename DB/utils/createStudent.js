const { generateCnp, extractFromCnp } = require('./cnpOperations');
const { generatePhoneNumber, generateUnamePassEmail, generateOtherData } = require('./generateData');

function createStudent(firstname, lastname, gender, studentNumber, groupID, startYear, fullYear) {
  const CNP = generateCnp(gender, fullYear);
  const { username, password, email } = generateUnamePassEmail(firstname, lastname);
  const phone = generatePhoneNumber();
  const { countyOfBirth, dateOfBirth } = extractFromCnp(CNP);
  const { militaryStatus, maritalStatus, nationality, bankAccount } = generateOtherData();

  let student = {
    CNP,
    username,
    password,
    email,
    firstname,
    lastname,
    gender,
    phone,
    dateOfBirth,
    countyOfOrigin: countyOfBirth,
    militaryStatus,
    maritalStatus,
    nationality,
    bankAccount,
    academicData: {
      studentNumber,
      groupID,
      startYear
      }
    };

  return student;
}

module.exports = createStudent;
