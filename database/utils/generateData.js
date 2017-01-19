function generatePhoneNumber() {
  let lastEight = [];
  for (i = 0; i < 8; i++) {
    lastEight.push(Math.round(Math.random() * 9));
  }
  return `07${lastEight.join('')}`;
}

function generateUnamePassEmail(firstname, lastname) {
  let fnameLovercase = firstname.toLowerCase();
  let lnameLovercase = lastname.toLowerCase();

  let joined = fnameLovercase + lnameLovercase + Math.round(Math.random() * 99);

  return {
    username: joined,
    password: joined,
    email: `${joined}@gmail.com`
  };
}

function generateBankAccount() {
  let countyCode = 'RO';
  let checkSum = Math.round(Math.random()*99);
  if (checkSum < 10) checkSum = '0' + checkSum;
  let lastTen = Math.round(Math.random() * (9999999999 - 1111111111));

  let iban = `${countyCode + checkSum}BTRLRONCRT${lastTen}`;
  return iban;
}

function generateOtherData() {
  let militaryRandom = Math.random();
  let maritalRandom = Math.random();

  let militaryStatus = militaryRandom < 0.02 ? 'Not incorporable' : 'Corporable';
  let maritalStatus = maritalRandom < 0.05 ? 'married' : 'not married';
  let nationality = 'Romanian';
  let bankAccount = generateBankAccount();

  return { militaryStatus, maritalStatus, nationality, bankAccount };
}

module.exports = {
  generatePhoneNumber,
  generateUnamePassEmail,
  generateOtherData
}
