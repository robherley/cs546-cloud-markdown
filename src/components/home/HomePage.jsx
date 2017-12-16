import React from 'react';
import { connect } from 'react-redux';
import { loadUserFiles } from '../../actions/userActions';
import { setFile } from '../../actions/fileActions';
import {
	withFlex,
	withRowClassName,
	withScrollableTbody,
	withFooterRow,
	withCellOnClick,
	Table
} from 'pivotal-ui/react/table';
import { Panel } from 'pivotal-ui/react/panels';
import Icon from '@fortawesome/react-fontawesome';
import { faPlus, faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { Input } from 'pivotal-ui/react/inputs';
import styled from 'styled-components';
import NewFile from './NewFile';
import { Flyout } from 'pivotal-ui/react/flyout';
import { withRouter } from 'react-router-dom';

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
		this.state = {
			search: ''
		};
	}

	async componentWillMount() {
		await this.props.loadUserFiles();
	}

	async editFile(obj) {
		await this.props.setFile(obj._id);
		await this.props.history.push('/editor');
	}

	filterAndMap() {
		return this.props.user.fileList
			.filter(file => file.filename.indexOf(this.state.search) !== -1)
			.map(file => {
				return {
					...file,
					filename: (
						<span className="filename">{file.filename}.md</span>
					),
					dateCreated: new Date(file.dateCreated).toLocaleString(),
					lastModified: new Date(file.lastModified).toLocaleString()
				};
			});
	}

	handleSearch(search) {
		this.setState({ search: search });
	}

	render() {
		const { user } = this.props;
		const ComposedTable = withFooterRow(
			withCellOnClick(
				withScrollableTbody(withFlex(withRowClassName(Table)))
			)
		);
		const columns = [
			{
				attribute: 'filename',
				displayName: 'File Name',
				onClick: (e, obj) => this.editFile(obj)
			},
			{
				attribute: 'dateCreated',
				displayName: 'Created On',
				onClick: (e, obj) => this.editFile(obj)
			},
			{
				attribute: 'lastModified',
				displayName: 'Last Modified',
				onClick: (e, obj) => this.editFile(obj)
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
						{!hasFiles ? (
							<span>
								<Icon icon={faArrowLeft} size="1x" />
								<Pad>You have no files! Make a new one!</Pad>
							</span>
						) : (
							<Input
								icon="search"
								placeholder="Search"
								onChange={e =>
									this.handleSearch(e.target.value)
								}
							/>
						)}
					</ButtonContainer>
					{hasFiles && (
						<ComposedTable
							scrollable
							tbodyHeight="70vh"
							columns={columns}
							className="main-table"
							data={this.filterAndMap()}
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

export default withRouter(
	connect(
		state => ({
			user: state.user
		}),
		{ loadUserFiles, setFile }
	)(HomePage)
);
