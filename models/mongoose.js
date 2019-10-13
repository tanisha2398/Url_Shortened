var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const mongoURI = process.env.mongoURI;

mongoose.connect(
  `mongodb+srv://tanisha:${mongoURI}@cluster0-cbzzj.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = {
  mongoose
};
// ${mongoURI}
