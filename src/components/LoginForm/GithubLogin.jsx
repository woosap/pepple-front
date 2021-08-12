import React from 'react';
import styled from 'styled-components';

const GithubLogin = () => {
	const uri = `http://52.79.202.229:8080/oauth2/authorize/github`;

	return <GithubLoginStyled href={uri}>Github</GithubLoginStyled>;
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
