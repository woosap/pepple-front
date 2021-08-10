import { React, useEffect } from 'react';
import styled from 'styled-components';
import dotenv from 'dotenv';

dotenv.config();

const KakaoLogin = () => {
	const { Kakao } = window;

	const KakaoInit = () => {
		if (!Kakao.isInitialized()) {
			Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
		}
	};

	useEffect(() => {
		KakaoInit();
	}, []);

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
