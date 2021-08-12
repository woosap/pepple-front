import React from 'react';
import styled from 'styled-components';

const KakaoLogin = () => {
	const uri = 'http://52.79.202.229:8080/oauth2/authorize/kakao';

	return <KakaoLoginStyled href={uri}>KAKAO TALK</KakaoLoginStyled>;
};

export default KakaoLogin;

const KakaoLoginStyled = styled.a`
	background: none;
	cursor: pointer;
	font-size: 12px;
	font-family: Apple SD Gothic Neo;
	letter-spacing: 0.1em;
`;
