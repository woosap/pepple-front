import React from 'react';
import {
	LoginFormStyled,
	LoginFormBox,
	SNSLoginList,
} from './LoginForm.styles';
import { ReactComponent as LogoIcon } from '../../assets/icon/icon-logo.svg';

const LoginForm = () => {
	return (
		<LoginFormStyled>
			<LoginFormBox>
				<LoginFormBox.Logo>
					<LogoIcon />
				</LoginFormBox.Logo>
				<LoginFormBox.Title>
					페플과 함께 공부하고 신나게 성장하세요
				</LoginFormBox.Title>
				<SNSLoginList>
					<SNSLoginList.Item className="google">Google</SNSLoginList.Item>
					<SNSLoginList.Item className="github">Github</SNSLoginList.Item>
					<SNSLoginList.Item className="kakao">KAKAO TALK</SNSLoginList.Item>
				</SNSLoginList>
				<LoginFormBox.Description>
					로그인 해야만 접속이 가능합니다.
				</LoginFormBox.Description>
			</LoginFormBox>
		</LoginFormStyled>
	);
};

export default LoginForm;
