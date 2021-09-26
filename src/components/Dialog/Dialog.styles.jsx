import styled from 'styled-components';

const DialogStyled = styled.div`
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	outline: 0;
`;

DialogStyled.Box = styled.div`
	width: ${({ type }) => {
		switch (type) {
			case 'create':
				return '713px';
			case 'alert':
				return '423px';
			default:
				return '567px';
		}
	}};
	height: ${({ type }) => {
		switch (type) {
			case 'login':
				return '617px';
			case 'create':
				return '437px';
			case 'alert':
				return '185px';
			default:
				return '625px';
		}
	}};
	position: relative;
	display: flex;
	flex-direction: column;
	background: #fff;
	border-radius: ${({ type }) => (type === 'login' ? '50px' : '20px')};
	box-sizing: border-box;
`;

export default DialogStyled;
