import styled from 'styled-components';

export const LoginFormStyled = styled.div`
	padding: 30px 60px 0 60px;
`;

export const LoginFormBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

LoginFormBox.Logo = styled.div``;

LoginFormBox.Title = styled.p`
	color: #213184;
	font-size: 32px;
	line-height: 40px;
	width: 279px;
	text-align: center;
	margin: 77px 0 108px 0;
	font-weight: normal;
	font-family: Noto Sans;
`;

LoginFormBox.Description = styled.div`
	font-size: 11px;
	margin: 10px 0 54px 0;
`;

export const SNSLoginList = styled.ul`
	width: 100%;

	.google {
		color: #4b4b4b;
		background-color: #fff;
	}

	.github {
		color: #fff;
		background-color: #d0d4ff;
		border: 0.5px solid #eee;
	}
	.kakao {
		background-color: #ffe712;
		border: none;
		font-weight: 500;
	}
`;

SNSLoginList.Item = styled.li`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 55px;
	font-size: 12px;
	letter-spacing: 0.1em;
	border: 0.5px solid #989898;
	box-sizing: border-box;
	border-radius: 30px;
	margin-bottom: 20px;
	cursor: pointer;
`;
