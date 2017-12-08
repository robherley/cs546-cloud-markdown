import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import showdown from 'showdown';
import { dark } from '../../config/editor_themes';

const converter = new showdown.Converter();
let timer;

// Link to understand Monaco themes:
// https://microsoft.github.io/monaco-editor/playground.html#customizing-the-appearence-exposed-colors

class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: '# Welcome To Stratus!\nType here to get started!',
			style: ''
		};
	}

	componentDidMount() {
		this.refs.renderedFromMD.innerHTML = converter.makeHtml(
			`${this.state.code} <style>${this.state.style}</style>`
		);
	}

	editorWillMount(monaco) {
		monaco.editor.defineTheme('strat-dark', dark);
	}

	editorDidMount(editor, monaco) {
		editor.focus();
	}

	onChange(newValue, e) {
		this.refs.renderedFromMD.innerHTML = converter.makeHtml(
			`${newValue} <style>${this.state.style}</style>`
		);
		// maybe a timeout feature to reduce lag on low power devices
		// if (timer) clearTimeout(timer);
		// timer = setTimeout(() => {
		// 	console.log(e);
		// 	this.refs.renderedFromMD.innerHTML = converter.makeHtml(
		// 		`${newValue} <style>${this.state.style}</style>`
		// 	);
		// }, 300);
	}

	render() {
		const { code, width } = this.state;
		const options = {
			selectOnLineNumbers: true,
			automaticLayout: true,
			fontSize: '14px',
			fontFamily: 'Fira Mono',
			colorTheme: 'start-light',
			minimap: {
				enabled: false
			}
		};
		return (
			<div style={{ display: 'flex', height: '95vh', width: '100vw' }}>
				<MonacoEditor
					language="markdown"
					width="50%"
					theme="strat-dark"
					value={code}
					options={options}
					onChange={(x, y) => this.onChange(x, y)}
					editorDidMount={(x, y) => this.editorDidMount(x, y)}
					editorWillMount={x => this.editorWillMount(x)}
				/>
				<div
					className="dark-theme"
					style={{ width: '50%', padding: '1em 2em' }}
					ref="renderedFromMD"
				/>
			</div>
		);
	}
}

export default Editor;
