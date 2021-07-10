import styled from 'styled-components';

const HeaderStyled = styled.header`
	position: relative;
	background: #ffffff;
	box-shadow: 0px 4px 30px rgba(135, 135, 135, 0.1);
	width: 100vw;
	height: 91px;

	h1 {
		position: absolute;
		top: 32px;
		left: 104px;
		font-family: Futura;
		font-style: normal;
		font-weight: 500;
		font-size: 30px;
		line-height: 18px;
		letter-spacing: -0.05em;
		color: #111862;
		cursor: pointer;
	}
`;

export default HeaderStyled;
