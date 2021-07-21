import React from 'react';
import styled from 'styled-components';

const { Kakao } = window;

const KakaoLogin = () => {
	const getAccessToken = authObj => {
		console.log(authObj);
	};

	const handleLoginError = error => {
		console.log(JSON.stringify(error));
	};

	const handleKakaoLoginClick = () => {
		Kakao.Auth.login({
			success: getAccessToken,
			fail: handleLoginError,
		});
	};

	return (
		<KakaoLoginStyled onClick={handleKakaoLoginClick}>
			KAKAO TALK
		</KakaoLoginStyled>
	);
};

export default KakaoLogin;

const KakaoLoginStyled = styled.button`
	background: none;
	cursor: pointer;
	font-size: 12px;
	font-family: Apple SD Gothic Neo;
	letter-spacing: 0.1em;
`;
