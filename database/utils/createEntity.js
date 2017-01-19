const { generateCnp, extractFromCnp } = require('./cnpOperations');
const { generatePhoneNumber, generateUnamePassEmail, generateOtherData } = require('./generateData');


// TODO: groupID should be referenced from group schema, to be removed from here
function createStudent(firstname, lastname, gender, studentNumber, fullYear) {
  const CNP = generateCnp(gender, fullYear);
  const { username, password, email } = generateUnamePassEmail(firstname, lastname);
  const phone = generatePhoneNumber();
  const { countyOfBirth, dateOfBirth } = extractFromCnp(CNP);
  const { militaryStatus, maritalStatus, nationality, bankAccount } = generateOtherData();

  let student = {
    CNP, username, password, email, firstname, lastname, gender, phone,
    dateOfBirth, countyOfOrigin: countyOfBirth, militaryStatus, maritalStatus,
    nationality, bankAccount, identificationNumber: studentNumber
  };

  return student;
}

function createTeacher(firstname, lastname, gender, identificationNumber, fullYear) {
  const CNP = generateCnp(gender, fullYear);
  const { username, password, email } = generateUnamePassEmail(firstname, lastname);
  const phone = generatePhoneNumber();
  const { countyOfBirth, dateOfBirth } = extractFromCnp(CNP);

  let teacher = {
    CNP, username, password, email, firstname, lastname, gender, phone, dateOfBirth
  }

  return teacher;

}

module.exports = {
  createStudent,
  createTeacher
};
