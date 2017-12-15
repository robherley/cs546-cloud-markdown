const { File } = require('../models/file');
const User = require('../models/user');
const uuidv4 = require('uuid/v4');
const AWS = require('aws-sdk');
AWS.config.region = 'us-east-2';
//from s3 env file
const IAM_USER_KEY = 'AKIAJTZOJ5MRJWXN5D7Q';
const IAM_USER_SECRET = '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';
const BUKET_NAME = 'stratus-testing-grounds';
const s3 = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET
});

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

  if(res.headerSet) {
    return;
  }

  userFiles.push(newFile);

  User.updateUser(id, { files: userFiles }, (err, user) => {
    if(err) {
      res.status(500).json({
        error: err
      });
      return;
    }

    //put file in s3
    //file name as newFile._id
    //filcontent as json with keys
    //filename, content, style
    //mapped to respective things
    const s3File = {
      filename: fname,
      content: fcontent,
      style: fstyle
    };

    s3.putObject({
      Bucket: `${BUKET_NAME}/${id}`,
      Key: `${newFile._id}.json`,
      Body: JSON.stringify(s3File),
      ContentType: "application/json"
    }, 
    (err, data) => {
      if(res.headerSet) {
       return;
      }
      if(err) {
        res.status(500).json({
          error: err
        });
        return;
      }
    });

    if(res.headerSet) {
     return;
    }

    res.status(201).json({
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
    if(err) {
      res.status(500).json({
        error: err
      });
      return;
    }
    //update file in s3
    //same as create
    const s3File = {
      filename: fname,
      content: fcontent,
      style: fstyle
    };

    if(res.headerSet) {
      return;
    }

    s3.putObject({
      Bucket: `${BUKET_NAME}/${uid}`,
      Key: `${fid}.json`,
      Body: JSON.stringify(s3File),
      ContentType: "application/json"
    }, 
    (err, data) => {
      if(res.headerSet) {
        return;
      }
      if(err) {
        res.status(500).json({
          error: err
        });
        return;
      }
    });

    if(res.headerSet) {
     return;
    }
    
    res.status(202).json({
      file: file
    });
  });
};

const deleteFile = (req, res) => {
  const fid = req.body.fileId;
  const uid = req.user._id;

  File.deleteFileById(fid, (err, files) => {
    if(err) {
      res.status(500).json({
        error: err
      });
      return;
    }
    //delete file in s3
    s3.deleteObject({
      Bucket: `${BUKET_NAME}/${uid}`,
      Key: `${fid}.json`
    },
    (err, data) => {
      if(res.headerSet) {
        return;
      }
      if(err) {
        res.status(500).json({
          error: err
        });
        return;
      }
    });

    if(res.headerSet) {
      return;
    }

    res.status(200).json({
      files: files
    });
  });
};

const loadFile = (req, res) => {
  const fid = req.body.fileId;
  const uid = req.user._id;

  File.getFileById(fid, (err, file) => {
    if(err) {
      res.status(500).json({
        error: err
      });
      return;
    }
    //grab file from s3 and read into json object
    s3.getObject({
      Bucket: `${BUKET_NAME}/${uid}`,
      Key: `${fid}.json`,
    },
    (err, content) => {
      if(res.headerSet) {
       return;
      }
      if(err) {
        res.status(500).json({
          error: err
        });
        return;
      }
      const data = JSON.parse(content.Body.toString());

      if(res.headerSet) {
       return;
      }

      res.status(200).json({
        filname: data.filename,
        content: data.content,
        style: data.style
      });
    });
    //console.log(load);
  });
  
};

module.exports = {
  createFile,
  updateFile,
  deleteFile,
  loadFile
};