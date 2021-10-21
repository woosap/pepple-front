import styled from 'styled-components';

export const RoomCloudViewStyled = styled.div`
	width: 100%;
	min-width: 140px;
	height: 100%;
	background-color: #fff;
	border: 1px solid #dadcf3;
	box-sizing: border-box;
	border-radius: 20px;
	position: relative;
`;

export const RoomCloudViewHeader = styled.div`
	height: 7%;
	margin: 25px 25px 0 25px;
`;

RoomCloudViewHeader.Title = styled.div`
	font-size: 15px;
	line-height: 16px;
	font-weight: 500;
	color: #3e217e;
	float: left;
`;

export const UploadButton = styled.button`
	background-color: #fff;
	float: right;
	cursor: pointer;
`;

export const ContentList = styled.ul``;

ContentList.Item = styled.li``;
