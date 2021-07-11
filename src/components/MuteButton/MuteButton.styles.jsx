import styled from 'styled-components';

const MuteButtonStyled = styled.button`
	width: 120px;
	height: 40px;
	background-color: #fff;
	border: 1px solid ${({ isMute }) => (isMute ? '#d0d4ff' : '#6138B9')};
	box-sizing: border-box;
	border-radius: 50px;
	color: ${({ isMute }) => (isMute ? '#9ea6fe' : '#6138B9')};
	margin-top: 18px;
	position: absolute;
	bottom: 0;
	right: 0;
	cursor: pointer;

	:hover {
		border: 1px solid #9ea6fe;
		background-color: #f5f6ff;
	}
`;

export default MuteButtonStyled;
