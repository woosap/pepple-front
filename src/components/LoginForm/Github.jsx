import React from 'react';
import styled from 'styled-components';

const GithubLogin = () => {
	const uri = `https://github.com/login/oauth/authorize?client_id=c626d47b6711b219e86c&redirect_uri=http://localhost:3000/redirect`;
	const handleLinkClick = e => {
		e.preventDefault();
	};
	return (
		<GithubLoginStyled href={uri} onClick={handleLinkClick}>
			Github
		</GithubLoginStyled>
	);
};

const GithubLoginStyled = styled.a`
	background: none;
	cursor: pointer;
	font-size: 12px;
	font-family: Apple SD Gothic Neo;
	letter-spacing: 0.1em;
	color: #fff;
`;

export default GithubLogin;
