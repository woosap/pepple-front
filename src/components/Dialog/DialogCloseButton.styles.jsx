import styled from 'styled-components';

const CloseButton = styled.button`
	width: 17px;
	height: 17px;
	position: absolute;
	top: 20px;
	right: 25px;
	cursor: pointer;
	background-color: #fff;
	outline: none;

	svg {
		width: 100%;
		height: 100%;
	}
`;

export default CloseButton;
