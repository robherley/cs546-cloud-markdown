import React from 'react';
import { connect } from 'react-redux';
import { loadUserFiles } from '../../actions/userActions';
import {
	withFlex,
	withRowClassName,
	withScrollableTbody,
	withFooterRow,
	Table
} from 'pivotal-ui/react/table';
import { Panel } from 'pivotal-ui/react/panels';
import Icon from '@fortawesome/react-fontawesome';
import { faPlus, faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import styled from 'styled-components';
import NewFile from './NewFile';
import { Flyout } from 'pivotal-ui/react/flyout';

const StyledButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

const Pad = styled.span`
	padding-left: 4px;
`;

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	padding-bottom: 1em;
`;

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		this.props.loadUserFiles();
	}

	render() {
		const { user } = this.props;
		const ComposedTable = withFooterRow(
			withScrollableTbody(withFlex(withRowClassName(Table)))
		);
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
		let { open } = this.state;
		return (
			user.fileList && (
				<div className="content-container">
					<ButtonContainer>
						<StyledButton
							className="btn btn-default btn-superblue mrl"
							onClick={() => this.setState({ open: true })}
						>
							<Icon icon={faPlus} size="1x" />
							<Pad>New File</Pad>
						</StyledButton>
						{!hasFiles && (
							<span>
								<Icon icon={faArrowLeft} size="1x" />
								<Pad>You have no files! Make a new one!</Pad>
							</span>
						)}
					</ButtonContainer>
					{hasFiles && (
						<ComposedTable
							scrollable
							tbodyHeight="70vh"
							columns={columns}
							className="main-table"
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
							footerRow={
								<div
									className="tr-hover tr grid"
									style={{
										borderBottom:
											'1px solid rgb(223, 229, 232)'
									}}
								>
									<div className="td col">
										{user.fileList.length} Files
									</div>
								</div>
							}
							rowClassName={({ isHeader }) =>
								!isHeader && 'tr-hover'
							}
						/>
					)}
					<Flyout
						{...{
							open,
							header: 'New File',
							children: <NewFile />,
							close: () => this.setState({ open: false })
						}}
					/>
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
