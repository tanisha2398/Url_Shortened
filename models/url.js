var mongoose = require("mongoose");

var urlSchema = new mongoose.Schema({
  url: String,
  shortUrl: String
});

module.exports = mongoose.model("Url", urlSchema);
