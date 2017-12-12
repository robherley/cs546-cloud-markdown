const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

const fileSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  filename: {
    type: String,
    required: [true, 'filename is not a valid string']
  },
  madeby: {
    type: String,
    required: [true, 'madeby is not a valid string']
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true
  },
  lastModified: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('File', fileSchema);

module.exports = {
  fileSchema
};