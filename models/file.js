const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const User = require('./user');


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

const File = mongoose.model('File', fileSchema);

File.newFile = (newFile, callback) => {
  newFile.save(callback);
};

File.getFileById = (id, callback) => {

};

module.exports = {
  File,
  fileSchema
};