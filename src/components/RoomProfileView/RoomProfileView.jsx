import React from 'react';
import {
	RoomProfileViewStyled,
	RoomTitle,
	RoomInfo,
} from './RoomProfileView.styles';

const RoomProfileView = ({ title, date }) => (
	<RoomProfileViewStyled>
		<RoomTitle>{title}</RoomTitle>
		<RoomInfo>
			<RoomInfo.CategoryList />
			<RoomInfo.BirthTime>{date}</RoomInfo.BirthTime>
		</RoomInfo>
	</RoomProfileViewStyled>
);

export default RoomProfileView;
