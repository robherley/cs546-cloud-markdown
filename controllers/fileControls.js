const { File } = require('../models/file');
const User = require('../models/user');
const uuidv4 = require('uuid/v4');
require('dotenv').config();
const AWS = require('aws-sdk');
AWS.config.region = 'us-east-2';
AWS.config.accessKeyId = process.env.AWS_USER_KEY;
AWS.config.secretAccessKey = process.env.AWS_USER_SECRET;
const BUKET_NAME = 'stratus-prod';
const s3 = new AWS.S3();

const createFile = async (req, res) => {
	const fname = req.body.fileName;
	const fcontent = req.body.content;
	const fstyle = req.body.style;

	const id = req.user.id;
	let userFiles = req.user.files;

	const newFile = new File({
		filename: fname,
		madeby: id
	});

	File.newFile(newFile, async (err, file) => {
		if (err) {
			res.status(424).json({
				error: err
			});
			return;
		}
	});

	if (res.headerSet) {
		return;
	}

	userFiles.push(newFile);

	await User.updateUser(id, { files: userFiles }, async (err, user) => {
		if (err) {
			res.status(500).json({
				error: err
			});
      console.log('hi')
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

		await s3.putObject(
			{
				Bucket: `${BUKET_NAME}/${id}`,
				Key: `${newFile._id}.json`,
				Body: JSON.stringify(s3File),
				ContentType: 'application/json'
			},
  		(err, data) => {

				if (err) {
					res.status(500).json({
						error: err
					});
          console.log('hi3')
					return;
				}

        res.status(201).json({
          id: newFile._id
        });
			}
		);
		
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
		if (err) {
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

		if (res.headerSet) {
			return;
		}

		s3.putObject(
			{
				Bucket: `${BUKET_NAME}/${uid}`,
				Key: `${fid}.json`,
				Body: JSON.stringify(s3File),
				ContentType: 'application/json'
			},
			(err, data) => {
				if (res.headerSet) {
					return;
				}
				if (err) {
					res.status(500).json({
						error: err
					});
					return;
				}
			}
		);

		res.status(202).json({
			file: file
		});
	});
};

const deleteFile = (req, res) => {
	const fid = req.body.fileId;
	const uid = req.user._id;

	File.deleteFileById(fid, (err, files) => {
		if (err) {
			res.status(500).json({
				error: err
			});
			return;
		}
		//delete file in s3
		s3.deleteObject(
			{
				Bucket: `${BUKET_NAME}/${uid}`,
				Key: `${fid}.json`
			},
			(err, data) => {
				if (res.headerSet) {
					return;
				}
				if (err) {
					res.status(500).json({
						error: err
					});
					return;
				}

        res.status(200).json({
          files: files
        });
			}
		);
		
	});
};

const loadFile = async (req, res) => {
	const fid = req.body.fileId;
	const uid = req.user._id;

	File.getFileById(fid, async (err, file) => {
		if (err) {
			res.status(500).json({
				error: err
			});
			return;
		}
		//grab file from s3 and read into json object
		await s3.getObject(
			{
				Bucket: `${BUKET_NAME}/${uid}`,
				Key: `${fid}.json`
			},
			async (err, content) => {
				if (res.headerSet) {
					return;
				}
				if (err) {
					res.status(500).json({
						error: err
					});
					return;
				}
				const data = JSON.parse(content.Body.toString());

				if (res.headerSet) {
					return;
				}

				res.status(200).json({
					filename: data.filename,
					content: data.content,
					style: data.style
				});
			}
		);
	});
};

module.exports = {
	createFile,
	updateFile,
	deleteFile,
	loadFile
};
