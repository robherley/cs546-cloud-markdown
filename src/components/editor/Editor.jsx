import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import showdown from 'showdown';
import styled from 'styled-components';
import { Tabs, Tab } from 'pivotal-ui/react/tabs';
import { DangerButton } from 'pivotal-ui/react/buttons';
import 'pivotal-ui/css/tabs';
import { connect } from 'react-redux';
import { dark } from '../../config/editor_themes';
import { updateContent, updateCSS } from '../../actions/editorActions';

const converter = new showdown.Converter();

const Separator = styled.div`
	width: 2px;
	height: 100%;
	background-color: rgb(81, 82, 86);
`;

const ContentContainer = styled.div`
	display: flex;
	width: 100vw;
	height: 95vh;
`;

// Link to understand Monaco themes:
// https://microsoft.github.io/monaco-editor/playground.html#customizing-the-appearence-exposed-colors

class Editor extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.updatePreview();
	}

	editorWillMount(monaco) {
		monaco.editor.defineTheme('strat-dark', dark);
	}

	editorDidMount(editor, monaco) {
		editor.focus();
	}

	componentDidUpdate() {
		this.updatePreview();
	}

	onChange(newValue, e) {
		this.props.updateContent(newValue);
	}

	updatePreview() {
		if (this.refs.renderedFromMD) {
			this.refs.renderedFromMD.innerHTML = converter.makeHtml(
				`${this.props.content} <style>${this.props.css}</style>`
			);
		}
	}

	render() {
		const { content, width } = this.props;
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
		if (width < 892) {
			// This is a nice number
			return (
				<Tabs defaultActiveKey={1}>
					<Tab eventKey={1} title="Markdown">
						<ContentContainer>
							<MonacoEditor
								language="markdown"
								width="100%"
								theme="strat-dark"
								value={content}
								options={options}
								onChange={(x, y) => this.onChange(x, y)}
								editorDidMount={(x, y) =>
									this.editorDidMount(x, y)
								}
								editorWillMount={x => this.editorWillMount(x)}
							/>
						</ContentContainer>
					</Tab>
					<Tab
						eventKey={2}
						title="Preview"
						onEntered={() => this.updatePreview()}
					>
						<div
							className="dark-theme"
							style={{
								width: '100vw',
								height: '95vh',
								padding: '1em 2em'
							}}
							ref="renderedFromMD"
						/>
					</Tab>
				</Tabs>
			);
		} else {
			return (
				<ContentContainer>
					<div
						style={{
							display: 'flex',
							width: '50%',
							flexDirection: 'column'
						}}
					>
						<DangerButton>All Files</DangerButton>
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
					</div>

					<Separator />
					<div
						className="dark-theme"
						style={{ width: '50%', padding: '1em 2em' }}
						ref="renderedFromMD"
					/>
				</ContentContainer>
			);
		}
	}
}

export default connect(
	state => ({
		content: state.editor.content,
		css: state.editor.css,
		width: state.width
	}),
	{ updateContent, updateCSS }
)(Editor);
