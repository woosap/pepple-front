import styled from 'styled-components';

export const RoomListViewStyled = styled.div``;

export const RoomList = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const CreateNewRoomButton = styled.button`
	position: fixed;
	bottom: 133px;
	right: 80px;
	z-index: 10;
	width: 234px;
	height: 67px;
	background: #ffffff;
	border: 1px solid ${({ clicked }) => (clicked ? '#6138B9' : '#C9CDFA')};
	box-sizing: border-box;
	box-shadow: 0px 0px 15px rgba(40, 40, 40, 0.1);
	border-radius: 40px;
	font-style: normal;
	font-weight: 500;
	font-size: 25px;
	line-height: 30px;
	letter-spacing: -0.05em;
	color: ${({ clicked }) => (clicked ? '#6138B9' : '#452d79')};
	cursor: pointer;

	:hover {
		color: #8289ca;
		background: #f8f8ff;
		border: 1px solid #e6e8ff;
		box-sizing: border-box;
		box-shadow: 0px 0px 15px rgba(40, 40, 40, 0.1);
		border-radius: 40px;
	}

	:focus {
		outline: none;
	}
`;
