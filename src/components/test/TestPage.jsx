import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sampleActions from '../../actions/sampleActions';

class TestPage extends React.Component {
	render() {
		const { sample, actions } = this.props;
		return (
			<div>
				<h1>Test</h1>
				<p>
					This component is actually a redux container! Click the button to
					dispatch a redux action.
				</p>
				<p>Spoiler: It's just a simple API fetch to the backend...</p>
				<p>Open dev-tools to see the state change!</p>
				<button onClick={() => actions.loadSampleData()}>Click Me</button>
				<p>{sample.msg}</p>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		sample: state.sample
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(sampleActions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
