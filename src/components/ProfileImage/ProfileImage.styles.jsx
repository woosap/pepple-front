import styled from 'styled-components';

const ProfileImageStyled = styled.div`
	width: ${props => (props.size === 'big' ? '140px' : '76px')};
	height: ${props => (props.size === 'big' ? '140px' : '76px')};
	margin: ${props => props.size === 'big' && '32px 0 23px 0'};
	border: 1px solid #dadcf3;
	box-sizing: border-box;
	border-radius: 100%;
	background: #fff;
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
`;

export default ProfileImageStyled;
