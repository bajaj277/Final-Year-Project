const mongoose = require("mongoose");

const todaySpecialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
});

const TodaySpecial = mongoose.model("TODAYSPECIAL", todaySpecialSchema);
module.exports = TodaySpecial;
