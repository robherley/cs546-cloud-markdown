import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import PropTypes from 'prop-types';
import { dark } from '../../config/editor_themes';
import styled from 'styled-components';
import { Form, FormRow, FormCol } from 'pivotal-ui/react/forms';
import { DefaultButton } from 'pivotal-ui/react/buttons';
import { Input } from 'pivotal-ui/react/inputs';
import { connect } from 'react-redux';
import { createFile } from '../../actions/fileActions';
import { Checkbox } from 'pivotal-ui/react/checkbox';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';

toastr.options = {
	positionClass: 'toast-top-center',
	progressBar: true,
	timeOut: 2500
};

const Wrapper = styled.div`
	width: 100%;
	height: 50vh;
	background-color: #282a36;
	border-radius: 5px;
	padding: 3px;
`;

const Error = styled.div`
	color: #eb4511;
`;

class NewFile extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
	}

	async addNewFile() {
		this.setState({ error: null });
		if (this.state.value) {
			for (let file of this.props.fileList) {
				if (file.filename === this.state.value) {
					toastr.error(
						`A file with the name '${
							file.filename
						}' already exists!`
					);
					return;
				}
			}
			await this.props.createFile({
				name: this.state.value,
				default: defaultcss.checked
			});
			await this.props.history.push('/editor');
		} else {
			toastr.error('Invalid File Name!');
			return;
		}
	}

	render() {
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
						<FormCol>
							<Checkbox
								label="Use Default CSS"
								id="defaultcss"
								defaultChecked
							/>
						</FormCol>
					</FormRow>
					<FormRow>
						<FormCol className="txt-r">
							<DefaultButton onClick={() => this.addNewFile()}>
								Add New File
							</DefaultButton>
						</FormCol>
					</FormRow>
					<FormRow>
						<FormCol className="txt-r">
							{this.state.error && (
								<Error>Error: {this.state.error}</Error>
							)}
						</FormCol>
					</FormRow>
				</Form>
			</div>
		);
	}
}

export default withRouter(
	connect(
		state => ({
			file: state.editor.file,
			fileList: state.user.fileList
		}),
		{ createFile }
	)(NewFile)
);
