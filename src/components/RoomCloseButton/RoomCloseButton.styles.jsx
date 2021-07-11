import styled from 'styled-components';

const RoomCloseButtonStyled = styled.button`
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

export default RoomCloseButtonStyled;
