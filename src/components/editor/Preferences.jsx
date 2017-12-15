import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import PropTypes from 'prop-types';
import { dark } from '../../config/editor_themes';
import styled from 'styled-components';
import { Form, FormRow, FormCol } from 'pivotal-ui/react/forms';
import { DefaultButton } from 'pivotal-ui/react/buttons';
import { Input } from 'pivotal-ui/react/inputs';
import { connect } from 'react-redux';
import { updateCSS, updateFileName } from '../../actions/editorActions';

const Wrapper = styled.div`
	width: 100%;
	height: 50vh;
	background-color: #282a36;
	border-radius: 5px;
	padding: 3px;
`;
const Fancy = styled.div`
	color: #f1f1f1;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	font-family: 'Barlow Semi Condensed', sans-serif;
	font-size: 1em;
`;

class Preferences extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.file
		};
	}

	updateInfo() {
		this.props.updateCSS(this.refs.css.editor.getModel().getValue());
		this.props.updateFileName(this.state.value);
	}

	render() {
		const options = {
			selectOnLineNumbers: true,
			automaticLayout: true,
			fontSize: '12px',
			fontFamily: 'Fira Mono',
			minimap: {
				enabled: false
			}
		};
		return (
			<div>
				<Form>
					<FormRow>
						<FormCol name="filename" label="File Name">
							<Input
								icon="copy"
								placeholder="Enter a File Name"
								value={this.state.value}
								onChange={e =>
									this.setState({
										value: e.target.value.replace(/\s/g, '')
									})
								}
							/>
						</FormCol>
					</FormRow>
					<FormRow>
						<FormCol label="Document CSS">
							<Wrapper>
								<MonacoEditor
									ref="css"
									language="css"
									width="100%"
									height="100%"
									value={this.props.css}
									options={options}
								/>
							</Wrapper>
						</FormCol>
					</FormRow>
					<FormRow>
						<FormCol className="txt-r">
							<DefaultButton onClick={() => this.updateInfo()}>
								Update Info
							</DefaultButton>
						</FormCol>
					</FormRow>
				</Form>
			</div>
		);
	}
}

export default connect(
	state => ({
		css: state.editor.css,
		file: state.editor.file
	}),
	{ updateCSS, updateFileName }
)(Preferences);
