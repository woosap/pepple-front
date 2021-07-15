import React from 'react';
import {
	RoomProfileViewStyled,
	RoomTitle,
	RoomInfo,
} from './RoomProfileView.styles';
import RoomCategory from '../RoomCategory/RoomCategory';

const RoomProfileView = ({ room, categories }) => (
	<RoomProfileViewStyled>
		<RoomTitle>{room.title}</RoomTitle>
		<RoomInfo>
			<RoomInfo.CategoryList>
				<RoomCategory category="DEVELOPMENT" categories={categories} />
				<RoomCategory category="STUDY" categories={categories} />
			</RoomInfo.CategoryList>
			<RoomInfo.BirthTime>{room.birthTime}</RoomInfo.BirthTime>
		</RoomInfo>
	</RoomProfileViewStyled>
);

export default RoomProfileView;
