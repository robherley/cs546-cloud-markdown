const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

const { fileSchema } = require('./file');

const userSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  username: {
    type: String,
    required: [true, 'username is not a valid string']
  },
  password: {
    type: String,
    required: [true, 'password is not a valid string']
  },
  email: {
    type: String,
    required: [true, 'email is not a valid string']
  },
  name: {
    type: String,
    required: [true, 'uname is not a valid string']
  },
  sessionID: {
    type: String,
    default: uuidv4
  },
  files: {
    type: [fileSchema],
    default: []
  }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.newUser = async (newUser, callback) => {
  bcrypt.genSalt(10, async (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      newUser.password = hash;
      await newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = (username, callback) => {
  User.findOne({username: username}, callback);
}

module.exports.getUserById =  (id, callback) => {
  User.findById(id, callback);
}

module.exports.comparePassword =  (possiblePass, hash, callback) => {
  bcrypt.compare(possiblePass, hash,  (err, match) => {
    if(err) throw err;
    callback(null, match);
  });
}

module.exports.updateUser = (id, updates, callback) => {
  if(updates[password].length !== 0) { 
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(updates.password, salt, async (err, hash) => {
        updates.password = hash;
      });
    });
  }
  User.findOneAndUpdate(
    { _id: id },
    {
      $set: updates
    },
    { new: true },
    callback
  );
};