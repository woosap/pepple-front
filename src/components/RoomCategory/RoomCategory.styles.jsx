import styled from 'styled-components';

const RoomCategoryStyled = styled.div`
	width: 50px;
	height: 19px;
	left: 473px;
	top: 201px;
	background: ${({ category }) => {
		if (category === 'DESIGN') return '#6138B9';
		if (category === 'STUDY') return '#FFDB80';
		if (category === 'DEVELOPMENT') return '#00C1B6';
		return '#FC80FF';
	}};
	border-radius: 50px;
	margin-right: 5px;
	font-family: Apple SD Gothic Neo;
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 14px;
	color: ${({ category }) => (category === 'STUDY' ? '#000' : '#fff')};
	text-align: center;
	line-height: 19px;
`;

export default RoomCategoryStyled;
