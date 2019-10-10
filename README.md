# Url_Shortened

## Shortening Algorithm

#### shortening function will generate a 6 digit random string

```javascript
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
```

### Whenever user request to shorten a big Url we store the big url as well as the shortString(6 digit random alphanumeric value) to the mongoDB database and send back the shortUrl as a response .And on hitting that url user will be redirected to the original big url.

## Component

- FrontEnd-React.js
- BackEnd-Node.js,Express.js
- Database-MongoDb

## Screenshot

![Capture](https://user-images.githubusercontent.com/28656259/66578018-fe447880-eb97-11e9-93ec-28fed5ef3557.PNG)
