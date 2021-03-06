import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/fontawesome-free-solid';
import { BrandButton } from 'pivotal-ui/react/buttons';
import Icon from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/fontawesome-free-solid';

const StyledNav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-family: 'Barlow Semi Condensed', sans-serif;
	text-transform: uppercase;
	height: 5vh;
	width: 100vw;
	color: #f1f1f1;
	background: rgb(55, 61, 73);
`;

const StyledLink = styled(Link)`
	margin-left: 20px;
	font-size: 1.5vh;
	text-decoration: none;
	color: #f1f1f1;
	border-bottom: 1px dashed #f1f1f1;
	padding: 0.2em 0;
	&:hover {
		color: rgb(55, 61, 73);
		background-color: #f1f1f1;
		border-color: ;
	}
`;

const Branding = styled.div`
	font-size: 2vh;
	color: #eb4511;
	padding-left: 5px;
`;

const ColorIcon = styled(FontAwesomeIcon)`
	color: #0496ff;
`;

const Row = styled.div`
	display: flex;
	align-items: center;
	padding: 0 20px;
`;

const User = styled.span`
	padding: 0 20px;
`;

const Text = styled.span`
	padding: 0 5px;
`;

const Logout = styled.a`
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

const Header = ({ user }) => {
	return (
		<StyledNav>
			<Row>
				<ColorIcon icon={faCloud} size="lg" />
				<Link to="/">
					<Branding>Stratus</Branding>
				</Link>
			</Row>
			<Row>
				<User>{user}</User>
				<Logout className="btn btn-brand-alt-danger" href="/logout">
					<Icon icon={faSignOutAlt} size="1x" />
					<Text>Log Out</Text>
				</Logout>
			</Row>
		</StyledNav>
	);
};

export default Header;
