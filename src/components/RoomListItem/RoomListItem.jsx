import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	RoomListItemStyled,
	RoomListItemBox,
	MemberProfileImageList,
} from './RoomListItem.styles';
import ProfileImage from '../ProfileImage/ProfileImage';
import RoomCategory from '../RoomCategory/RoomCategory';

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
							<RoomCategory
								key={categoriesObj[category].id}
								category={category}
								categories={categoriesObj}
							/>
						))}
					</RoomListItemBox.CategoryList>
					<RoomListItemBox.Title>{room.title}</RoomListItemBox.Title>
					<RoomListItemBox.Subtitle>{room.subtitle}</RoomListItemBox.Subtitle>
					<RoomListItemBox.BirthTime>
						{room.birthTime}
					</RoomListItemBox.BirthTime>
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
