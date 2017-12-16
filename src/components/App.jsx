import React from 'react';
import Header from './common/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeWidth } from '../actions/widthActions';
import { loadUserInfo } from '../actions/userActions';

class App extends React.Component {
	componentWillMount() {
		this.props.loadUserInfo();
	}

	componentDidMount() {
		this.props.changeWidth(window.innerWidth);
		window.addEventListener('resize', () =>
			this.props.changeWidth(window.innerWidth)
		);
	}

	render() {
		return (
			this.props.user.about && (
				<div className="content">
					<Header user={this.props.user.about.username} />
					<div>{this.props.children}</div>
				</div>
			)
		);
	}
}

export default withRouter(
	connect(
		state => ({
			user: state.user
		}),
		{ loadUserInfo, changeWidth }
	)(App)
);
