const { File } = require('../models/file');
const User = require('../models/user');
const uuidv4 = require('uuid/v4');

const createFile = (req, res) => {
	const fname = req.body.fileName;
	const fcontent = req.body.content;
  const fstyle = req.body.style;

  const id = req.user.id;
  let userFiles = req.user.files;

	const newFile = new File({
		filename: fname,
    madeby: id
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
  
};

const updateFile = (req, res) => {
  const fname = req.body.fileName;
  const fcontent = req.body.content;
  const fstyle = req.body.style;
  const fid = req.body.fileId;

  const uid = req.user.id;
  let updates = {
    filename: fname,
    lastModified: Date.now()
  };

  const upFile = File.updateFile(fid, updates, (err, file) => {
    if(err) throw err;
    return file;
  });

  //update file in s3
};

module.exports = {
  createFile,
  updateFile
};