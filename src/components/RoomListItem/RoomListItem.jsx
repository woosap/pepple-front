import React from 'react';
import {
	RoomListItemStyled,
	RoomListItemBox,
	MemberProfileImageList,
} from './RoomListItem.styles';
import ProfileImage from '../ProfileImage/ProfileImage';
import RoomCategory from '../RoomCategory/RoomCategory';

const RoomListItem = ({ room }) => {
	return (
		<RoomListItemStyled>
			<RoomListItemBox>
				<RoomListItemBox.CategoryList>
					{room.categories.map(category => (
						<RoomCategory category={category} />
					))}
				</RoomListItemBox.CategoryList>
				<RoomListItemBox.Title>{room.title}</RoomListItemBox.Title>
				<RoomListItemBox.Subtitle>{room.subtitle}</RoomListItemBox.Subtitle>
				<RoomListItemBox.BirthTime>{room.birthTime}</RoomListItemBox.BirthTime>
			</RoomListItemBox>
			<MemberProfileImageList>
				<ProfileImage />
				<ProfileImage />
			</MemberProfileImageList>
		</RoomListItemStyled>
	);
};

export default RoomListItem;
