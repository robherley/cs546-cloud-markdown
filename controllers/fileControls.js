const { File } = require('../models/file');
const User = require('../models/user');
const uuidv4 = require('uuid/v4');
const AWS = require('aws-sdk');
AWS.config.region = 'us-east-2';
const s3 = new AWS.S3();
var credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;

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
  });

  let uploadFile = {
    filename : newFile.filename,
    content : fcontent,
    style : fstyle
  }
  s3.putObject({
    Bucket: `testing-cs546/${id}`, 
    Key: `${newFile._id}.json`,
    //makes the object a string to be put into the s3 bucket
    Body: JSON.stringify(uploadFile), 
    //makes it json on the s33 bucket (so you can read it without downloading)
    ContentType: "application/json"
  }, function(err,data) {
    if(err) {
      console.log(JSON.stringify(err));
    } else {
      console.log(JSON.stringify(data));
    };
  }); 
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

  let uploadFile = {
    filename : newFile.filename,
    content : fcontent,
    style : fstyle
  }
  s3.putObject({
    Bucket: `testing-cs546/${uid}`, 
    Key: `${fid}.json`,
    //makes the object a string to be put into the s3 bucket
    Body: JSON.stringify(uploadFile), 
    //makes it json on the s33 bucket (so you can read it without downloading)
    ContentType: "application/json"
  }, function(err,data) {
    if(err) {
      console.log(JSON.stringify(err));
    } else {
      console.log(JSON.stringify(data));
    };
  });
};

const deleteFile = (req, res) => {
  const fid = req.body.fileId;
  const uid = req.user.id;

  File.deleteFileById(fid, (err, files) => {
    if(err) throw err;
    //delete file in s3
    
    res.status(200).json({
      files: files
    });
  });

  s3.deleteObject({
    //Bucket gets put into folder test-folder inside of the bucket testing-cs546
    Bucket: `testing-cs546/${uid}`, 
    Key: `${fid}.json`
  }, function(err, data) {
    if(err) {
      console.log(JSON.stringify(err));
    } else {
      console.log(JSON.stringify(data));
    }
  });
};

const loadFile = (req, res) => {
  const fid = req.body.fileId;
  const uid = req.user.id;

  File.getFileById(fid, (err, file) => {
    //grab file from s3 and read into json object
    
    res.status(200).json({
      filename: 's3file.filename',
      content: 's3file.content',
      style: 's3file.style'
    });
  });

  let file = s3.getObject({
    Bucket : `testing-aws/${uid}`,
    Key : `${fid}`
  });


};

module.exports = {
  createFile,
  updateFile,
  deleteFile,
  loadFile
};