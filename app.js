const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");

const app = express();
const port = process.env.PORT || 5000;
var shorteningAlgo = require("./models/shorteningAlgo");
var { mongoose } = require("./models/mongoose");
var Url = require("./models/url");
var Counter = require("./models/counter");

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

app.post("/", (req, res, next) => {
  try {
    let { url } = req.body;
    // let shortUrl = shorteningAlgo.shortUrl();
    Url.findOne({ url: url }, (err, foundUrl) => {
      if (err) {
        console.log(err);
      } else {
        if (foundUrl == null) {
          const urlDb = new Url({
            url
          });

          urlDb.save((err, url) => {
            if (err) {
              console.log(err);
            } else {
              console.log(url);
              let shortUrl = shorteningAlgo.shortUrl(url.id);
              console.log(shortUrl);
              console.log(url._id);
              Url.findByIdAndUpdate(
                { _id: url._id },
                { $set: { shortUrl: shortUrl } },
                { new: true },
                (err, doc) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.send(doc.shortUrl);
                  }
                }
              );
            }
          });
        } else {
          res.send(foundUrl.shortUrl);
        }
      }
    });
  } catch (e) {
    next(e);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(port, () => console.log(`app is running on port ${port}`));
