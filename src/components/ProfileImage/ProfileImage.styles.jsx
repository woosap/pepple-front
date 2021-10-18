import styled from 'styled-components';

const ProfileImageStyled = styled.div`
	width: ${({ size }) => {
		if (size === 'big') return '140px';
		if (size === 'medium') return '86.12px';
		return '76px';
	}};
	height: ${({ size }) => {
		if (size === 'big') return '140px';
		if (size === 'medium') return '86.12px';
		return '76px';
	}};
	margin: ${props => (props.size === 'big' ? '32px 0 23px 0' : '0')};
	border: 1px solid #dadcf3;
	border-radius: 100%;
	z-index: ${({ order, length }) => length - order};
	${({ size }) => {
		if (size === 'small') {
			return `position: absolute;`;
		}
		return '';
	}}
	right: ${({ order, length }) =>
		length - order > 0 ? (length - order) * 38 : 0}px;
	overflow: hidden;
	box-sizing: border-box;

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
