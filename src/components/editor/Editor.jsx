import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import showdown from 'showdown';

const converter = new showdown.Converter();

// Link to understand Monaco themes:
// https://microsoft.github.io/monaco-editor/playground.html#customizing-the-appearence-exposed-colors

class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: '# Welcome To Stratus!\nType here to get started!'
		};
	}

	componentDidMount() {
		this.refs.renderedFromMD.innerHTML = converter.makeHtml(
			this.state.code
		);
	}

	editorWillMount(monaco) {
		// init theme here
	}

	editorDidMount(editor, monaco) {
		editor.focus();
	}

	onChange(newValue, e) {
		console.log('onChange', e);
		this.refs.renderedFromMD.innerHTML = converter.makeHtml(newValue);
	}

	render() {
		const { code, width } = this.state;
		const options = {
			selectOnLineNumbers: true,
			automaticLayout: true,
			fontSize: '14px'
		};
		return (
			<div style={{ display: 'flex', height: '95vh', width: '100vw' }}>
				<MonacoEditor
					language="markdown"
					theme="vs-dark"
					width="50%"
					value={code}
					options={options}
					onChange={(x, y) => this.onChange(x, y)}
					editorDidMount={(x, y) => this.editorDidMount(x, y)}
				/>
				<div
					style={{ width: '50%', padding: '1em 2em' }}
					ref="renderedFromMD"
				/>
			</div>
		);
	}
}

export default Editor;
