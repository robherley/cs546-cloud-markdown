import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/fontawesome-free-solid';

const StyledNav = styled.nav`
	display: flex;
	align-items: center;
	font-family: 'Barlow Semi Condensed', sans-serif;
	text-transform: uppercase;
	height: 5vh;
	width: 100vw;
	padding-left: 20px;
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
	padding-left: 5px;
	font-size: 2vh;
	color: #eb4511;
`;

const ColorIcon = styled(FontAwesomeIcon)`
	color: #0496ff;
`;

const Header = () => {
	return (
		<StyledNav>
			<ColorIcon icon={faCloud} size="lg" />
			<Branding>Stratus</Branding>
			<StyledLink to="/">Editor</StyledLink>
			<StyledLink to="/redux">My Files</StyledLink>
			<StyledLink to="/about">Log Out</StyledLink>
		</StyledNav>
	);
};

export default Header;
