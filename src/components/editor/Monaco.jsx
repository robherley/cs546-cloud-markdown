import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import styled from 'styled-components';
import { dark } from '../../config/editor_themes';
import { DangerButton } from 'pivotal-ui/react/buttons';
import { connect } from 'react-redux';
import { updateContent } from '../../actions/editorActions';
import { setFile } from '../../actions/fileActions';
import Icon from '@fortawesome/react-fontawesome';
import {
	faCode,
	faCopy,
	faCog,
	faSave,
	faTrashAlt,
	faChevronCircleLeft
} from '@fortawesome/fontawesome-free-solid';
import { Tooltip, TooltipTrigger } from 'pivotal-ui/react/tooltip';
import { Flyout } from 'pivotal-ui/react/flyout';
import { BrandButton } from 'pivotal-ui/react/buttons';
import Preferences from './Preferences';
import axios from 'axios';
import toastr from 'toastr';
import { withRouter } from 'react-router-dom';

// Link to understand Monaco themes:
// https://microsoft.github.io/monaco-editor/playground.html#customizing-the-appearence-exposed-colors

toastr.options = {
	positionClass: 'toast-top-center',
	progressBar: true,
	timeOut: 700
};

const Bar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.3em 1em;
`;

const CountBar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5em 1em;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	font-family: 'Barlow Semi Condensed', sans-serif;
	font-size: 0.8em;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #282a36;
	width: ${props => props.width}px;
`;

const FileName = styled.div`
	font-family: 'Fira Mono', monospace;
	padding-left: 1em;
`;

const StyledIcon = styled(Icon)`
	color: #0496ff;
	&:hover {
		color: #077bce;
	}
`;

class Monaco extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	editorWillMount(monaco) {
		monaco.editor.defineTheme('strat-dark', dark);
	}

	editorDidMount(editor, monaco) {
		editor.focus();
	}

	async saveAndExit() {
		await this.saveFile();
		this.props.history.push('/');
	}

	onChange(newValue, e) {
		this.props.updateContent(newValue);
	}

	async saveFile() {
		await axios
			.post('/api/v1/file/update', {
				fileName: this.props.file,
				content: this.props.content,
				style: this.props.css,
				fileId: this.props.id
			})
			.then(res => {
				toastr.success('File Saved!');
			})
			.catch(error => {
				toastr.danger('Error Saving File!');
			});
	}

	async deleteFile() {
		const result = await confirm('Are you sure you want to delete?');
		if (result) {
			await axios
				.post('/api/v1/file/delete', {
					fileId: this.props.id
				})
				.then(res => {
					toastr.success(`File '${this.props.file}.md' Deleted!`);
					this.props.setFile(null);
					this.props.history.push('/');
				})
				.catch(error => {
					toastr.danger('Error Deleting File!');
				});
		}
	}

	render() {
		const options = {
			selectOnLineNumbers: true,
			automaticLayout: true,
			fontSize: '14px',
			fontFamily: 'Fira Mono',
			colorTheme: 'strat-dark',
			minimap: {
				enabled: false
			}
		};
		const { width, file, content, css } = this.props;
		const { open } = this.state;
		return (
			<Wrapper width={width}>
				<Bar>
					<div className="simple-row">
						<TooltipTrigger
							tooltip="Back"
							trigger="hover"
							theme="light"
						>
							<StyledIcon
								icon={faChevronCircleLeft}
								size="lg"
								onClick={() => this.saveAndExit()}
							/>
						</TooltipTrigger>
						<FileName>{file}.md</FileName>
					</div>
					<div className="simple-row" style={{ width: '220px' }}>
						<TooltipTrigger
							tooltip="Delete File"
							trigger="hover"
							theme="light"
						>
							<BrandButton
								className="btn-brand-alt-danger"
								alt
								small
								onClick={() => this.deleteFile()}
							>
								<Icon icon={faTrashAlt} size="1x" />
							</BrandButton>
						</TooltipTrigger>
						<TooltipTrigger
							tooltip="Save File"
							className="btn-brand-alt-success"
							trigger="hover"
							theme="light"
						>
							<BrandButton
								alt
								small
								onClick={() => this.saveFile()}
							>
								<Icon icon={faSave} size="1x" />
							</BrandButton>
						</TooltipTrigger>
						<TooltipTrigger
							tooltip="Export"
							trigger="hover"
							theme="light"
						>
							<BrandButton
								alt
								small
								onClick={() => this.props.onExport()}
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
								onClick={() => this.setState({ open: true })}
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
					value={content}
					options={options}
					onChange={(x, y) => this.onChange(x, y)}
					editorDidMount={(x, y) => this.editorDidMount(x, y)}
					editorWillMount={x => this.editorWillMount(x)}
				/>
				<CountBar className="condensed-text">
					Words: {(content.match(/\S+/g) || []).length} Chars:{' '}
					{content.length}
				</CountBar>
				<Flyout
					{...{
						open,
						header: 'Preferences',
						children: <Preferences />,
						close: () => this.setState({ open: false })
					}}
				/>
			</Wrapper>
		);
	}
}

export default withRouter(
	connect(
		state => ({
			content: state.editor.content,
			css: state.editor.css,
			file: state.editor.file,
			id: state.editor.id
		}),
		{ updateContent, setFile }
	)(Monaco)
);
