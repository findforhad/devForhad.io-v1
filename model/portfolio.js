const mongoose = require("mongoose");
const PortfolioSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  subTitle: {
    required: true,
    type: String
  },
  desc: {
    required: true,
    type: String
  },
  features: [{ type: String }],
  githubRepo: {
    type: String
  },
  previewLink: {
    type: String
  },
  imagePath: {
    type: String
  },
  published: {
    type: Date,
    default: Date.now
  }
});

module.exports = Portfolio = mongoose.model("projects", PortfolioSchema);
