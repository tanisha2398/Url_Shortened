var mongoose = require("mongoose");
var Counter = require("./counter");
var urlSchema = new mongoose.Schema({
  url: String,
  shortUrl: String,
  id: { type: Number, unique: true, min: 1 }
});
urlSchema.pre("save", function(next) {
  if (!this.isNew) {
    next();
    return;
  }

  Counter.autoIncrementModelID("activities", this, next);
});

module.exports = mongoose.model("Url", urlSchema);
