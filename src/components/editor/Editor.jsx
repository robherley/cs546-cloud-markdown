import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import showdown from 'showdown';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { dark } from '../../config/editor_themes';
import { updateContent, updateCSS } from '../../actions/editorActions';

const converter = new showdown.Converter();
const Separator = styled.div`
	width: 2px;
	height: 100%;
	background-color: rgb(81, 82, 86);
`;

// Link to understand Monaco themes:
// https://microsoft.github.io/monaco-editor/playground.html#customizing-the-appearence-exposed-colors

class Editor extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.refs.renderedFromMD.innerHTML = converter.makeHtml(
			`${this.props.content} <style>${this.props.css}</style>`
		);
	}

	editorWillMount(monaco) {
		monaco.editor.defineTheme('strat-dark', dark);
	}

	editorDidMount(editor, monaco) {
		editor.focus();
	}

	onChange(newValue, e) {
		this.props.updateContent(newValue);
		this.refs.renderedFromMD.innerHTML = converter.makeHtml(
			`${newValue} <style>${this.props.code}</style>`
		);
	}

	render() {
		const { content } = this.props;
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
					width="100%"
					theme="strat-dark"
					value={content}
					options={options}
					onChange={(x, y) => this.onChange(x, y)}
					editorDidMount={(x, y) => this.editorDidMount(x, y)}
					editorWillMount={x => this.editorWillMount(x)}
				/>
				<Separator />
				<div
					className="dark-theme"
					style={{ width: '100%', padding: '1em 2em' }}
					ref="renderedFromMD"
				/>
			</div>
		);
	}
}

export default connect(
	state => ({
		content: state.editor.content,
		css: state.editor.css
	}),
	{ updateContent, updateCSS }
)(Editor);
