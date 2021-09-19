import styled from 'styled-components';

export const RoomListItemStyled = styled.div`
	width: 312px;
	height: 242px;
	background: #ffffff;
	border: solid ${({ clicked }) => (clicked ? '2px #6138b9' : '1px #dadcf3')};
	box-sizing: border-box;
	box-shadow: 0px 4px 30px 2px rgba(0, 0, 0, 0.02);
	border-radius: 30px;
	margin: 0 43px 60px 0;
	padding: 16px 26px 21px 26px;
	position: relative;
	cursor: pointer;

	:hover {
		background: ${({ clicked }) => (clicked ? '#fff' : '1px #fbfcff')};
		border: 2px solid #6138b9;
	}
`;

export const RoomListItemBox = styled.div``;

RoomListItemBox.CategoryList = styled.div`
	display: flex;
`;

RoomListItemBox.CategoryItem = styled.div`
	background-color: ${({ value }) => {
		if (value === 'DESIGN') return '#6138B9';
		if (value === 'STUDY') return '#FFDB80';
		if (value === 'DEVELOP') return '#00C1B6';
		return '#FC80FF';
	}};
	color: ${({ value }) => (value === 'STUDY' ? '#10022D' : '#FFF')};
	width: 50px;
	height: 19px;
	left: 473px;
	top: 201px;
	border-radius: 50px;
	margin-right: 5px;
	font-family: Apple SD Gothic Neo;
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 14px;
	text-align: center;
	line-height: 19px;
`;

RoomListItemBox.Title = styled.div`
	font-family: DIN Alternate;
	font-style: normal;
	font-weight: bold;
	font-size: 24px;
	line-height: 36px;
	letter-spacing: -0.03em;
	color: #0d1249;
	position: relative;
	left: -1px;
`;

RoomListItemBox.Subtitle = styled.div`
	font-family: Apple SD Gothic Neo;
	font-style: normal;
	font-weight: 200;
	font-size: 16px;
	letter-spacing: -0.03em;
	color: #000000;
`;

RoomListItemBox.BirthTime = styled.div`
	display: inline-block;
	font-family: Apple SD Gothic Neo;
	font-style: normal;
	font-weight: 200;
	font-size: 12px;
	line-height: 36px;
	letter-spacing: -0.03em;
	color: #575757;
	margin-bottom: 13px;
`;

export const MemberProfileImageList = styled.div`
	display: flex;
	justify-content: flex-end;
	position: absolute;
	bottom: 21px;
	right: 63px;
`;
