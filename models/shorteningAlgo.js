const shortUrl = () => {
  var randomString = "";
  var length = 6;
  while (length) {
    let randNum = Math.floor(Math.random() * 36);
    if (randNum >= 26) {
      randNum = randNum % 26;
    } else {
      var isCapital = Math.floor(Math.random() * 2);
      randNum =
        isCapital == 0
          ? String.fromCharCode(randNum + 65)
          : String.fromCharCode(randNum + 97);
    }
    randomString += randNum;
    length--;
  }
  return randomString;
};

module.exports = {
  shortUrl
};
