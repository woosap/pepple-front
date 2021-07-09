import styled from 'styled-components';

export const RoomProfileViewStyled = styled.div`
	width: 100%;
	height: 120px;
	background-color: #fff;
	border: 1px solid #dadcf3;
	box-sizing: border-box;
	border-radius: 30px;
	margin: 40px 0 27px 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 4%;
`;

export const RoomTitle = styled.h1`
	font-size: 20px;
	font-weight: 500;
	color: #3e217e;
`;

export const RoomInfo = styled.div`
	position: relative;
`;

RoomInfo.CategoryList = styled.div`
	display: flex;
`;

RoomInfo.BirthTime = styled.div`
	font-size: 12px;
	margin: 12px 6px 0 0;
	text-align: end;
`;
