import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import styled from 'styled-components';
import { dark } from '../../config/editor_themes';
import 'pivotal-ui/css/iconography';
import { DangerButton } from 'pivotal-ui/react/buttons';
import { connect } from 'react-redux';
import { updateContent } from '../../actions/editorActions';
import Icon from '@fortawesome/react-fontawesome';
import { faCode, faCopy, faCog } from '@fortawesome/fontawesome-free-solid';
import { Tooltip, TooltipTrigger } from 'pivotal-ui/react/tooltip';
import { BrandButton } from 'pivotal-ui/react/buttons';

// Link to understand Monaco themes:
// https://microsoft.github.io/monaco-editor/playground.html#customizing-the-appearence-exposed-colors

const Bar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.3em 2em;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: ${props => props.width}px;
`;

const FileName = styled.div`
	font-family: 'Fira Mono', monospace;
`;

class Monaco extends Component {
	constructor(props) {
		super(props);
	}

	editorWillMount(monaco) {
		monaco.editor.defineTheme('strat-dark', dark);
	}

	editorDidMount(editor, monaco) {
		editor.focus();
	}

	onChange(newValue, e) {
		this.props.updateContent(newValue);
	}

	render() {
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
		const { width, file } = this.props;
		return (
			<Wrapper width={width}>
				<Bar className="dark-theme">
					<div className="simple-row" style={{ width: '100px' }}>
						<Icon icon={faCode} size="1x" />
						<FileName>{file}</FileName>
					</div>
					<div className="simple-row" style={{ width: '120px' }}>
						<TooltipTrigger
							tooltip="Export"
							trigger="hover"
							theme="light"
						>
							<BrandButton
								alt
								small
								onClick={() => this.props.loadSampleData()}
							>
								<Icon icon={faCopy} size="1x" />
							</BrandButton>
						</TooltipTrigger>
						<TooltipTrigger
							tooltip="Preferences"
							trigger="hover"
							theme="light"
						>
							<BrandButton
								alt
								small
								onClick={() => this.props.loadSampleData()}
							>
								<Icon icon={faCog} size="1x" />
							</BrandButton>
						</TooltipTrigger>
					</div>
				</Bar>
				<MonacoEditor
					language="markdown"
					width="100%"
					theme="strat-dark"
					value={this.props.content}
					options={options}
					onChange={(x, y) => this.onChange(x, y)}
					editorDidMount={(x, y) => this.editorDidMount(x, y)}
					editorWillMount={x => this.editorWillMount(x)}
				/>
			</Wrapper>
		);
	}
}

export default connect(
	state => ({
		content: state.editor.content
	}),
	{ updateContent }
)(Monaco);
