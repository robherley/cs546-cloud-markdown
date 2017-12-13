const { File } = require('../models/file');
const User = require('../models/user');
const uuidv4 = require('uuid/v4');

const createFile = (req, res) => {
	const fname = req.body.fileName;
	const fcontent = req.body.content;
  const id = req.user.id;
  let userFiles = req.user.files;

	const newFile = new File({
		filename: fname
	});

	File.newFile(newFile, (err, file) => {
		if(err) {
      res.status(424).json({
        error: err
      });
      return;
    }
	});

  userFiles.push(newFile);

  User.updateUser(id, { files: userFiles }, (err, user) => {
    if(err) throw err;
    res.status(200).json({
      user: user
    });
  })
  //put file in s3
  res.status(201).json({
      msg: userFiles
    });
};

const updateFile = (req, res) => {


  const fname = req.body.fileName;
  const fcontent = req.body.content;

  const newFile = new File({
    filename: fname
  });

  File.newFile(newFile, (err, file) => {
    if(err) {
      res.status(424).json({
        error: err
      });
      return;
    }
  });


  //update file in s3
};

module.exports = {
  createFile,
  updateFile
};