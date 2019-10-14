const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");

const app = express();
const port = process.env.PORT || 5000;
var shorteningAlgo = require("./models/shorteningAlgo");
var { mongoose } = require("./models/mongoose");
var Url = require("./models/url");

// additional configuration
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(bodyParser.json());

app.get("/:id", (req, res) => {
  let params = req.params;
  Url.findOne({ shortUrl: params.id }, (err, url) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(url.url);
    }
  });
});

app.post("/", (req, res) => {
  var url = req.body.url;
  var shortUrl = shorteningAlgo.shortUrl();

  Url.findOne({ url: url }, (err, furl) => {
    if (err) {
      console.log(err);
    } else {
      if (furl == null) {
        console.log("furl===", furl);

        Url.findOne({ shortUrl: shortUrl }, (err, alreadypresent) => {
          if (err) {
            console.log(err);
          } else {
            if (alreadypresent == null) {
              console.log("not shortuurl present in db");
              shortUrl = shortUrl;
              return (breakTheLoop = true);
            } else {
              shortUrl = shorteningAlgo.shortUrl();
              console.log(shortUrl);
            }
          }
        });

        var newField = {
          url: url,
          shortUrl: shortUrl
        };
        Url.create(newField, (err, newlyCreatedUrl) => {
          if (err) {
            console.log(err);
          } else {
            // console.log(newlyCreatedUrl);
            res.send(newlyCreatedUrl.shortUrl);
          }
        });
      } else {
        res.send(furl.shortUrl);
      }
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(port, () => console.log(`app is running on port ${port}`));
