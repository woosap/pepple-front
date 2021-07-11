import React from 'react';
import {
	RoomListItemStyled,
	RoomListItemBox,
	MemberProfileImageList,
} from './RoomListItem.styles';
import ProfileImage from '../ProfileImage/ProfileImage';
import RoomCategory from '../RoomCategory/RoomCategory';

const RoomListItem = ({ room, categories }) => {
	return (
		<RoomListItemStyled>
			<RoomListItemBox>
				<RoomListItemBox.CategoryList>
					{room.categories.map(category => (
						<RoomCategory category={category} categories={categories} />
					))}
				</RoomListItemBox.CategoryList>
				<RoomListItemBox.Title>{room.title}</RoomListItemBox.Title>
				<RoomListItemBox.Subtitle>{room.subtitle}</RoomListItemBox.Subtitle>
				<RoomListItemBox.BirthTime>{room.birthTime}</RoomListItemBox.BirthTime>
			</RoomListItemBox>
			<MemberProfileImageList>
				<ProfileImage order={1} />
				<ProfileImage order={2} />
			</MemberProfileImageList>
		</RoomListItemStyled>
	);
};

export default RoomListItem;
