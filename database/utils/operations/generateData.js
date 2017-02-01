function generatePhoneNumber() {
  const lastEight = [];
  for (let i = 0; i < 8; i += 1) {
    lastEight.push(Math.round(Math.random() * 9));
  }
  return `407${lastEight.join('')}`;
}

function generateUnamePassEmail(firstname, lastname) {
  const fnameLovercase = firstname.toLowerCase();
  const lnameLovercase = lastname.toLowerCase();

  const joined = fnameLovercase + lnameLovercase + Math.round(Math.random() * 99);

  return {
    username: joined,
    password: joined,
    email: `${joined}@gmail.com`,
  };
}

function generateBankAccount() {
  const countyCode = 'RO';
  let checkSum = Math.round(Math.random() * 99);
  if (checkSum < 10) checkSum = `0${checkSum}`;
  const lastTen = Math.round(Math.random() * (9999999999 - 1111111111));

  const iban = `${countyCode + checkSum}BTRLRONCRT${lastTen}`;
  return iban;
}

function generateOtherData() {
  const militaryRandom = Math.random();
  const maritalRandom = Math.random();

  const militaryStatus = militaryRandom < 0.02 ? 'Not incorporable' : 'Corporable';
  const maritalStatus = maritalRandom < 0.05 ? 'married' : 'not married';
  const nationality = 'Romanian';
  const bankAccount = generateBankAccount();

  return { militaryStatus, maritalStatus, nationality, bankAccount };
}

module.exports = {
  generatePhoneNumber,
  generateUnamePassEmail,
  generateOtherData,
};
