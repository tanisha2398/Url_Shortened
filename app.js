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
  let { url } = req.body;
  Url.findOne({ url: url }, (err, url) => {
    if (err) {
      let shortUrl = shorteningAlgo.shortUrl();
      const urlDb = new Url({
        url,
        shortUrl
      });
      urlDb.save((err, url) => {
        if (err) {
          console.log(err);
        } else {
          res.send(url.shortUrl);
        }
      });
    } else {
      res.send(url.shortUrl);
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(port, () => console.log(`app is running on port ${port}`));
