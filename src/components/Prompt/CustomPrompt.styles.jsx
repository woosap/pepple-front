import styled from 'styled-components';

const CustomModalStyled = styled.div`
	width: 100%;
	height: 100%;
	border: 1px solid #d0d4ff;
	box-sizing: border-box;
	box-shadow: 0px 4px 40px rgba(147, 147, 147, 0.1);
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 35px;

	p {
		width: 85%;
		text-align: left;
	}

	svg {
		position: absolute;
		top: 18px;
		right: 22px;
		cursor: pointer;
	}
`;

CustomModalStyled.Title = styled.p`
	font-weight: bold;
	font-size: 16px;
	line-height: 23px;
	letter-spacing: -0.03em;
	color: #6138b9;
	margin-bottom: 5px;

	.icon {
		width: 20px;
		height: 20px;
		margin-left: 8px;
	}
`;

CustomModalStyled.Description = styled.p`
	font-weight: 300;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.03em;
	color: #686868;
	margin-bottom: 35px;
`;

CustomModalStyled.ButtonWrapper = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: space-around;
`;

CustomModalStyled.Button = styled.button`
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

export default CustomModalStyled;
