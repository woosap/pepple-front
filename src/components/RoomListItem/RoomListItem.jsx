import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
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

	return (
		<Link to={`/room/${room.roomId}`}>
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
					<ProfileImage order={1} />
					<ProfileImage order={2} />
				</MemberProfileImageList>
			</RoomListItemStyled>
		</Link>
	);
};

export default RoomListItem;
