import React, { useContext } from 'react';
import nextId from 'react-id-generator';
import {
	RoomListItemStyled,
	RoomListItemBox,
	MemberProfileImageList,
} from './RoomListItem.styles';
import ProfileImage from '../ProfileImage/ProfileImage';
import DefaultContext from '../../store/default';
import RoomContext from '../../store/room';

const RoomListItem = ({ room, categories }) => {
	const { categoriesObj } = useContext(DefaultContext);
	const { enterRoom, getTime } = useContext(RoomContext);

	const handleRoomClick = () => {
		enterRoom(room.roomId);
	};

	return (
		<RoomListItemStyled onClick={handleRoomClick}>
			<RoomListItemBox>
				<RoomListItemBox.CategoryList>
					{categories.map(category => (
						<RoomListItemBox.CategoryItem
							key={categoriesObj[category].id}
							value={category}
						>
							{categoriesObj[category].title}
						</RoomListItemBox.CategoryItem>
					))}
				</RoomListItemBox.CategoryList>
				<RoomListItemBox.Title>{room.title}</RoomListItemBox.Title>
				<RoomListItemBox.Subtitle>{room.subTitle}</RoomListItemBox.Subtitle>
				<RoomListItemBox.BirthTime>{getTime(room)}</RoomListItemBox.BirthTime>
			</RoomListItemBox>
			<MemberProfileImageList>
				{room.imageUrl.map((image, index, arr) => (
					<ProfileImage
						key={nextId()}
						url={image}
						order={index + 1}
						length={arr.length}
						size="small"
					/>
				))}
			</MemberProfileImageList>
		</RoomListItemStyled>
	);
};

export default RoomListItem;
