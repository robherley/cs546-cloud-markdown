export default {
	editor: {
		content: '',
		css: `
		* {
			color: #f1f1f1; 
			font-family: sans-serif;
		}
		body {
			padding: 1em 2em; 
		} 
		pre {
			padding: 1em;
			background-color: rgba(255, 255, 255, 0.1);
			border-radius: 4px;
		}
		
		pre > code {
			background-color: rgba(255, 255, 255, 0);
		}
		
		code {
			padding: 0.5em;
			background-color: rgba(255, 255, 255, 0.1);
			border-radius: 4px;
		}
		`
	},
	width: null,
	sample: null
};
