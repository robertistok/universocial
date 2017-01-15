function generatePhoneNumber() {
  let lastEight = [];
  for (i = 0; i < 8; i++) {
    lastEight.push(Math.round(Math.random() * 9));
  }
  return `07${lastEight.join('')}`;
}

console.log(generatePhoneNumber());
