const express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var path = require('path');

const app = express();
const port = process.env.PORT || 5000;
var { mongoose } = require("./models/mongoose");
var Url = require("./models/url");

// additional configuration
app.use(cors()); // Use this after the variable declaration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(bodyParser.json());
// app.use(methodOverride("_method"));



//configuring passport
// 5d9e1301ff43b0419968a513
app.get("/:id", (req, res) => {
  let params = req.params;
  console.log(params);
  Url.findById(params.id, (err, url) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(url.url);
    }
  });
});

app.post("/", (req, res) => {
  let { url } = req.body;
  console.log(url);
  const urlDb = new Url({
    url
  });
  urlDb.save((err, url) => {
    if (err) {
      console.log(err);
    } else {
      res.send(url._id);
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
});

app.listen(port, () => console.log(`app is running on port ${port}`));
