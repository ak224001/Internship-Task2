const mongoose = require("mongoose");

var Person = mongoose.model("Person", {
  name: { type: String },
  age: { type: Number },
  mobile: { type: Number },
  gender: { type: String }
});

module.exports = { Person };
