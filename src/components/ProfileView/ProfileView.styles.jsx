import styled from 'styled-components';

export const ProfileViewStyled = styled.div`
	width: 300px;
	height: 490px;
	background: #fff;
	border: 1px solid #dadcf3;
	box-sizing: border-box;
	border-radius: 35px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 53px 0 95px;
`;

export const ProfileImage = styled.div`
	width: 140px;
	height: 140px;
	border: 1px solid #dadcf3;
	box-sizing: border-box;
	border-radius: 100%;
	margin: 32px 0 23px 0;
`;

export const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

UserInfo.Name = styled.div`
	font-style: normal;
	font-weight: bold;
	font-size: 20px;
	line-height: 24px;
	color: #000000;
	margin-bottom: 4px;
`;

UserInfo.Job = styled.div`
	font-style: normal;
	font-weight: 300;
	font-size: 12px;
	line-height: 14px;
	color: #9f9f9f;
`;

UserInfo.Description = styled.div`
	font-style: normal;
	font-weight: 300;
	font-size: 12px;
	line-height: 18px;
	color: #000000;
	width: 214px;
	margin: 21px 0 30px 0;
`;

export const ModifyProfileButton = styled.button`
	width: 214px;
	height: 48px;
	color: ${({ clicked }) => (clicked ? '#6138B9' : '#35294e')};
	background: ${({ clicked }) =>
		clicked ? 'rgba(245, 246, 255, 0.25)' : '#fff'};
	border: 0.5px solid ${({ clicked }) => (clicked ? '#6138B9' : '#b9b9b9')};
	box-sizing: border-box;
	border-radius: 50px;
	font-style: normal;
	font-weight: 200;
	font-size: 14px;
	line-height: 18px;
	cursor: pointer;

	:hover {
		background: ${({ clicked }) =>
			clicked ? 'rgba(245, 246, 255, 0.25)' : 'rgba(218, 220, 243, 0.25)'};
		border: 0.5px solid ${({ clicked }) => (clicked ? '#6138B9' : '#dadcf3')};
		box-sizing: border-box;
		border-radius: 50px;
	}
`;

export const SNSList = styled.ul`
	display: flex;
	align-items: center;
	height: 87px;
	margin-top: 14px;
`;

SNSList.Item = styled.li`
	width: 37px;
	height: 37px;
	background: #f5f6ff;
	border: 1px solid #c9cdfa;
	box-sizing: border-box;
	border-radius: 6px;
	margin: 0 11px 0 11px;
	cursor: pointer;
`;
