const mongoose = require("mongoose");

const CVFileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  remarks: {
    type: String
  },
  file: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  }
});

const cvFile = mongoose.model("cvFile", CVFileSchema);
exports.cvFile = cvFile;
