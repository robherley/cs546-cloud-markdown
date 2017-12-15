import React from 'react';
import { connect } from 'react-redux';
import { loadUserFiles } from '../../actions/userActions';
import { withFlex, withRowClassName, Table } from 'pivotal-ui/react/table';
import { Panel } from 'pivotal-ui/react/panels';
import Icon from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';
import styled from 'styled-components';

const StyledButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

const Pad = styled.span`
	padding-left: 4px;
`;

class HomePage extends React.Component {
	componentWillMount() {
		this.props.loadUserFiles();
	}

	render() {
		const { user } = this.props;
		const ComposedTable = withFlex(withRowClassName(Table));
		const columns = [
			{
				attribute: 'filename',
				displayName: 'File Name'
			},
			{
				attribute: 'dateCreated',
				displayName: 'Created On'
			},
			{
				attribute: 'lastModified',
				displayName: 'Last Modified'
			}
		];
		let hasFiles;
		if (user.fileList) {
			hasFiles = user.fileList.length !== 0;
		}
		return (
			user.fileList && (
				<div className="panel-container">
					<Panel
						className="bg-neutral-11 box-shadow-1 border-rounded dark-text"
						scrollable={window.innerWidth / 2}
						header={
							<span>
								Hello, {user.about.name}.{' '}
								{hasFiles
									? 'Here are your files:'
									: 'You have no files!'}
							</span>
						}
						actions={
							<div>
								<StyledButton className="btn btn-default mrl">
									<Icon icon={faPlus} size="1x" />
									<Pad>New File</Pad>
								</StyledButton>
							</div>
						}
					>
						{hasFiles ? (
							<ComposedTable
								columns={columns}
								data={user.fileList.map(file => {
									return {
										...file,
										dateCreated: new Date(
											file.dateCreated
										).toLocaleString(),
										lastModified: new Date(
											file.lastModified
										).toLocaleString()
									};
								})}
								rowClassName={({ isHeader }) =>
									!isHeader && 'tr-hover'
								}
							/>
						) : null}
					</Panel>
				</div>
			)
		);
	}
}

export default connect(
	state => ({
		user: state.user
	}),
	{ loadUserFiles }
)(HomePage);
