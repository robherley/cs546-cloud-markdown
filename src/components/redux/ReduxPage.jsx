import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadSampleData } from '../../actions/sampleActions';
import { DefaultButton } from 'pivotal-ui/react/buttons';

class ReduxPage extends React.Component {
	render() {
		return (
			<div>
				<h1>Test</h1>
				<p>
					This component is actually a redux container! Click the
					button to dispatch a redux action.
				</p>
				<p>Spoiler: It's just a simple API fetch to the backend...</p>
				<p>Open dev-tools to see the state change!</p>
				<DefaultButton onClick={() => this.props.loadSampleData()}>
					Click Me
				</DefaultButton>
				{this.props.sample && <p>{this.props.sample.msg}</p>}
			</div>
		);
	}
}

export default connect(
	state => ({
		sample: state.sample
	}),
	{ loadSampleData }
)(ReduxPage);
