import React from 'react';
import Header from './common/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeWidth } from '../actions/widthActions';

class App extends React.Component {
	componentWillMount() {
		this.props.changeWidth(window.innerWidth);
		window.addEventListener('resize', () =>
			this.props.changeWidth(window.innerWidth)
		);
	}

	componentWillUnmount() {
		window.removeEventListener('resize');
	}

	render() {
		return (
			<div>
				<Header />
				{this.props.children}
			</div>
		);
	}
}

export default withRouter(connect(null, { changeWidth })(App));
