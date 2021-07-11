import React from 'react';
import { Link } from 'react-router-dom';
import HeaderStyled from './Header.styles';

const Header = () => {
	return (
		<HeaderStyled>
			<Link to="/">
				<h1>Pepple</h1>
			</Link>
		</HeaderStyled>
	);
};

export default Header;
