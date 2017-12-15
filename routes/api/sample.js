const router = require('express').Router();

const getTest = async (req, res) => {
	try {
		res.status(200).json({
			msg: 'Message from the server!'
		});
	} catch (err) {
		res.status(400).json({
			msg: 'Some Error Occured',
			err
		});
	}
};

router.get('/api/sample', (req, res) => res.json({ msg: 'Testing!!!' }));

module.exports = router;
