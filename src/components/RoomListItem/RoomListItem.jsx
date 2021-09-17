import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	RoomListItemStyled,
	RoomListItemBox,
	MemberProfileImageList,
} from './RoomListItem.styles';
import ProfileImage from '../ProfileImage/ProfileImage';

const RoomListItem = ({ room, categories, categoriesObj }) => {
	const [clicked, setClicked] = useState(false);

	const handleClick = () => {
		setClicked(prev => !prev);
	};

	return (
		<Link to="/room">
			<RoomListItemStyled clicked={clicked} onClick={handleClick}>
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
					<RoomListItemBox.BirthTime>{room.date}</RoomListItemBox.BirthTime>
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
