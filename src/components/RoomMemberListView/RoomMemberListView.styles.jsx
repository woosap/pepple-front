import styled from 'styled-components';

export const RoomMemberListViewStyled = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 24px;
	height: 500px;
`;

export const MemberWrapper = styled.div`
	display: flex;
	background-color: #fff;
	border: 1px solid #d0d4ff;
	box-sizing: border-box;
	border-radius: 35px;
`;

MemberWrapper.Left = styled.div`
	display: flex;
	margin: 30px;
	align-items: center;
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
	color: #3e217e;
`;

export const MemberJob = styled.div`
	font-size: 10px;
	line-height: 14px;
	color: #b7b7b7;
	margin-bottom: 14px;
`;

export const ProfileImageWrapper = styled.div``;
