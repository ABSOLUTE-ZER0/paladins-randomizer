const mongoose = require("mongoose");

const championSchema = mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  img: {
    type: String,
  },
  cards: {
    type: Array
  },
  talents: {
    type: Array
  },
});

module.exports = mongoose.model("Champion", championSchema);
