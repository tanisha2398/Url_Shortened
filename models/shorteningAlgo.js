const shortUrl = id => {
  var shorturl = "";
  var charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  // console.log(charset[3]);
  while (id) {
    num = id % 62;
    shorturl += charset[num];
    id = Math.floor(id / 62);
  }

  // console.log(shorturl);
  reverse = shorturl
    .split("")
    .reverse()
    .join("");

  return reverse;
};

// shortUrlToId;
// shortUrl(66);
module.exports = {
  shortUrl
};
