import styled from 'styled-components';

const ProfileImageStyled = styled.div`
	width: ${props => (props.size === 'big' ? '140px' : '76px')};
	height: ${props => (props.size === 'big' ? '140px' : '76px')};
	border: 1px solid #dadcf3;
	box-sizing: border-box;
	border-radius: 100%;
	margin: 32px 0 23px 0;
`;

export default ProfileImageStyled;
