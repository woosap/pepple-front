import React from 'react';
import styled from 'styled-components';

const GoogleLogin = () => {
	const uri = 'http://52.79.202.229:8080/oauth2/authorize/google';

	return <GoogleLoginStyled href={uri}>Google</GoogleLoginStyled>;
};

export default GoogleLogin;

export const GoogleLoginStyled = styled.div`
	width: 100%;
	text-align: center;
`;
