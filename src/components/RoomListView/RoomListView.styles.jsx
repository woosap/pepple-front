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

export const Loading = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 100px;
	margin-left: -30px;
	font-size: 18px;
	color: #111862;
	letter-spacing: -0.05em;

	p {
		margin: 0 40px 0 20px;
	}
`;

export const AlertModal = styled.div`
	width: 423px;
	height: 185px;
	background-color: #fff;
	border: 1px solid #d0d4ff;
	box-sizing: border-box;
	box-shadow: 0px 4px 40px rgba(147, 147, 147, 0.1);
	border-radius: 20px;
	z-index: 100;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 35px;

	p {
		width: 88%;
		text-align: left;
	}

	svg {
		position: absolute;
		top: 18px;
		right: 22px;
		cursor: pointer;
	}
`;

AlertModal.Title = styled.p`
	font-weight: bold;
	font-size: 16px;
	line-height: 23px;
	letter-spacing: -0.03em;
	color: #6138b9;
	margin-bottom: 5px;
	display: flex;
	align-items: center;
	.icon {
		margin-top: -2px;
		margin-left: 8px;
		font-size: 21px;
		display: inline-block;
		height: 21px;
	}
`;

AlertModal.Description = styled.p`
	font-weight: 300;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.03em;
	color: #686868;
	margin-bottom: 40px;
`;

AlertModal.Button = styled.button`
	width: 110px;
	height: 36px;
	background: #6138b9;
	border-radius: 40px;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.03em;
	color: #ffffff;
	cursor: pointer;
`;
