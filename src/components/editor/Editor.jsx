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
	background-color: rgb(55, 61, 73);
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
		if (this.refs.eyeFrame) {
			let { document: eyeDoc } = this.refs.eyeFrame.contentWindow;
			eyeDoc.body.innerHTML = converter.makeHtml(this.props.content);
			let style = eyeDoc.createElement('style');
			style.innerHTML = `${
				this.props.css
			} @page {color: inherit; size: auto; margin: 0;}`;
			eyeDoc.body.appendChild(style);
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
							<Monaco
								file="test.md"
								width={width}
								onExport={() =>
									this.refs.eyeFrame.contentWindow.print()
								}
							/>
						</ContentContainer>
					</Tab>
					<Tab
						eventKey={2}
						title="Preview"
						onEntered={() => this.updatePreview()}
					>
						<iframe
							style={{
								height: '95vh',
								width: width
							}}
							frameBorder="0"
							ref="eyeFrame"
						/>
					</Tab>
				</Tabs>
			);
		} else {
			return (
				<ContentContainer>
					<Monaco
						file="test.md"
						width={width / 2}
						onExport={() =>
							this.refs.eyeFrame.contentWindow.print()
						}
					/>
					<Separator />
					<iframe
						style={{
							height: '95vh',
							width: width / 2
						}}
						frameBorder="0"
						ref="eyeFrame"
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
