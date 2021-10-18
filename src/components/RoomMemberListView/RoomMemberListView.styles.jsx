import styled from 'styled-components';

export const RoomMemberListViewStyled = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 24px;
	height: calc(70vh - 205px);
`;

export const MemberWrapper = styled.div`
	display: flex;
	min-width: 230px;
	min-height: 180px;
	max-width: 400px;
	max-height: 250px;
	justify-content: center;
	background-color: #fff;
	border: 1px solid #d0d4ff;
	box-sizing: border-box;
	border-radius: 35px;
	padding: 10px;
`;

MemberWrapper.Left = styled.div`
	display: flex;
	align-items: center;
	margin-right: 15%;
`;

MemberWrapper.Right = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const MemberName = styled.div`
	font-size: 16px;
	font-weight: 500;
	line-height: 23px;
	color: ${({ audio }) => (audio === 'unmute' ? '#3e217e' : '#4B4B4B')};
`;

export const MemberJob = styled.div`
	font-size: 10px;
	line-height: 14px;
	color: #b7b7b7;
	margin-bottom: 14px;
`;

export const ProfileImageWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 98px;
	height: 98px;
	border-radius: 100%;
	border: 5px solid
		${({ audio }) => (audio === 'unmute' ? '#d0d4ff' : '#C8C9CE')};
	box-sizing: border-box;
`;
