import styled from 'styled-components';

const AlertModalStyled = styled.div`
	width: 100%;
	height: 100%;
	border: 1px solid #d0d4ff;
	box-sizing: border-box;
	box-shadow: 0px 4px 40px rgba(147, 147, 147, 0.1);
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	padding: 35px 0 25px 0;

	p {
		font-weight: bold;
	}

	svg {
		position: absolute;
		top: 18px;
		right: 22px;
		cursor: pointer;
	}
`;

AlertModalStyled.Title = styled.p`
	font-size: 16px;
	font-weight: bold;
	line-height: 23px;
	letter-spacing: -0.03em;
	color: #444;
	margin-bottom: 5px;
`;

AlertModalStyled.Description = styled.p`
	font-weight: 300;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.03em;
	color: #686868;
	margin-bottom: 35px;
`;

AlertModalStyled.Button = styled.button`
	width: 110px;
	height: 36px;
	background-color: ${({ type }) => (type === 'cancle' ? '#aaa' : '#6138b9')};
	color: #ffffff;
	border-radius: 40px;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.03em;
	cursor: pointer;
	margin-right: ${({ type }) => type === 'leave' && '10px'};
`;

export default AlertModalStyled;
