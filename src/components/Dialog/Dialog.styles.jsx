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
		if (type === 'login' || type === 'profile_join' || type === 'profile_edit')
			return '567px';
		return '713px';
	}};
	height: ${({ type }) => {
		if (type === 'login') return '617px';
		if (type === 'profile_join' || type === 'profile_edit') return '600px';
		return '437px';
	}};
	position: relative;
	display: flex;
	flex-direction: column;
	background: #fff;
	border-radius: ${({ type }) => (type === 'login' ? '50px' : '20px')};
	box-sizing: border-box;
`;

export default DialogStyled;
