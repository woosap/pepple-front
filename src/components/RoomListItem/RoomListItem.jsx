import React, { useState, useEffect, useContext } from 'react';
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
	const [clicked, setClicked] = useState(false);
	const [time, setTime] = useState('');

	useEffect(() => {
		setTime(getTime(room));
	}, []);

	const handleRoomClick = () => {
		setClicked(prev => !prev);
		enterRoom(room.roomId);
	};

	/*
	const getLeft = () => {
		const arr = [];
		for (let i = room.imageUrl.length; i < room.capacity; i += 1) {
			arr.push(
				<ProfileImage
					key={nextId()}
					url={EmptyImage}
					order={i + 1}
					size="small"
					length={room.capacity}
				/>,
			);
		}
		return arr;
	};
	*/

	return (
		<RoomListItemStyled clicked={clicked} onClick={handleRoomClick}>
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
				<RoomListItemBox.BirthTime>{time}</RoomListItemBox.BirthTime>
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
