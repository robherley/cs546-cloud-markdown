export default {
	editor: {
		id: '',
		file: '',
		content: '',
		css:
			'* {\n\tcolor: #f1f1f1; \n\tfont-family: sans-serif;\n}\n\nbody {\n\tpadding: 1em 2em; \n} \n\npre {\n\tpadding: 1em;\n\tbackground-color: rgba(255, 255, 255, 0.1);\n\tborder-radius: 4px;\n}\n\npre > code {\n\tbackground-color: rgba(255, 255, 255, 0);\n}\n\ncode {\n\tpadding: 0.5em;\n\tbackground-color: rgba(255, 255, 255, 0.1);\n\tborder-radius: 4px;\n}\t'
	},
	width: null,
	isFetching: {
		status: true,
		error: null
	},
	user: {
		about: null,
		fileList: null
	}
};
