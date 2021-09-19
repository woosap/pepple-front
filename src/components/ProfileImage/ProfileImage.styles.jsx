import styled from 'styled-components';

const ProfileImageStyled = styled.div`
	width: ${({ size }) => {
		if (size === 'big') return '140px';
		if (size === 'medium') return '86px';
		return '76px';
	}};
	height: ${({ size }) => {
		if (size === 'big') return '140px';
		if (size === 'medium') return '86px';
		return '76px';
	}};
	margin: ${props => (props.size === 'big' ? '32px 0 23px 0' : '0')};
	border: 1px solid #dadcf3;
	border-radius: 100%;
	z-index: ${({ order }) => {
		if (order === 1) return '3';
		if (order === 2) return '2';
		return '1';
	}};
	position: relative;
	left: ${({ order }) => {
		if (order === 1) return '76px';
		if (order === 2) return '38px';
		return '0px';
	}};
	overflow: hidden;

	img {
		width: calc(100% + 6px);
		height: calc(100% + 6px);
		position: relative;
		top: -3px;
		left: -3px;
		border-radius: 100%;
		background-color: #fff;
	}
`;

export default ProfileImageStyled;
