import styled from 'styled-components';

export const RoomCloseButtonStyled = styled.button`
	width: 145px;
	height: 48px;
	background-color: #fff;
	border: 1px solid ${({ clicked }) => (clicked ? '#6138B9' : '#d0d4ff')};
	box-sizing: border-box;
	border-radius: 50px;
	color: #6138b9;
	margin-top: 17px;
	cursor: pointer;
	float: right;
	:hover {
		color: ${({ clicked }) => (clicked ? '#6138B9' : '#d0d4ff')};
		border: 1px solid ${({ clicked }) => (clicked ? '#6138B9' : '#eceeff')};
	}
`;

export const RoomCloseModal = styled.div`
	width: 423px;
	height: 185px;
	position: absolute;
	right: 0px;
	bottom: 55px;
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

RoomCloseModal.Title = styled.p`
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

RoomCloseModal.Description = styled.p`
	font-weight: 300;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.03em;
	color: #686868;
	margin-bottom: 40px;
`;

RoomCloseModal.Button = styled.button`
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
