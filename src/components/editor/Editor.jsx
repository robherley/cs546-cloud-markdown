import React from 'react';
import showdown from 'showdown';
import styled from 'styled-components';
import { Tabs, Tab } from 'pivotal-ui/react/tabs';
import 'pivotal-ui/css/tabs';
import { connect } from 'react-redux';
import Monaco from './Monaco';
import { updateCSS } from '../../actions/editorActions';

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

class Editor extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.updatePreview();
	}

	componentDidUpdate() {
		this.updatePreview();
	}

	updatePreview() {
		if (this.refs.renderedFromMD) {
			this.refs.renderedFromMD.innerHTML = converter.makeHtml(
				`${this.props.content} <style>${this.props.css}</style>`
			);
		}
	}

	render() {
		const { width } = this.props;
		if (width < 892) {
			// This is a nice number
			return (
				<Tabs defaultActiveKey={1} className="custom-tabs">
					<Tab eventKey={1} title="Markdown">
						<ContentContainer>
							<Monaco file="test.md" width={width} />
						</ContentContainer>
					</Tab>
					<Tab
						eventKey={2}
						title="Preview"
						onEntered={() => this.updatePreview()}
					>
						<div
							style={{
								height: '95vh',
								padding: '1em 2em',
								backgroundColor: '#282a36',
								width: width
							}}
							ref="renderedFromMD"
						/>
					</Tab>
				</Tabs>
			);
		} else {
			return (
				<ContentContainer>
					<Monaco file="test.md" width={width / 2} />
					<Separator />
					<div
						style={{
							height: '95vh',
							padding: '1em 2em',
							width: width / 2
						}}
						ref="renderedFromMD"
					/>
				</ContentContainer>
			);
		}
	}
}

export default connect(
	state => ({
		width: state.width,
		css: state.editor.css,
		content: state.editor.content
	}),
	{ updateCSS }
)(Editor);
