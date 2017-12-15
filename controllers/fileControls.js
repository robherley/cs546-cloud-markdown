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

    //put file in s3
    //file name as newFile._id
    //filcontent as json with keys
    //filename, content, style
    //mapped to respective things

    res.status(200).json({
      user: user
    });
  })
  
};

const updateFile = (req, res) => {
  const fname = req.body.fileName;
  const fcontent = req.body.content;
  const fstyle = req.body.style;
  const fid = req.body.fileId;

  const uid = req.user.id;
  let updates = {
    filename: fname,
    lastModified: new Date(Date.now()).toISOString()
  };

  File.updateFile(uid, fid, updates, (err, file) => {
    if(err) throw err;
    //update file in s3
    //same as create
    
    res.status(200).json({
      file: file
    });
  });
};

const deleteFile = (req, res) => {
  const fid = req.body.fileId;

  File.deleteFileById(fid, (err, files) => {
    if(err) throw err;
    //delete file in s3
    
    res.status(200).json({
      files: files
    });
  });
};

const loadFile = (req, res) => {
  const fid = req.body.fileId;

  File.getFileById(fid, (err, file) => {
    //grab file from s3 and read into json object
    res.status(200).json({
      filname: 's3file.filename',
      content: 's3file.content',
      style: 's3file.style'
    });
  });
  
};

module.exports = {
  createFile,
  updateFile,
  deleteFile,
  loadFile
};