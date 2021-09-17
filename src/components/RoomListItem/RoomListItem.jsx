import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	RoomListItemStyled,
	RoomListItemBox,
	MemberProfileImageList,
} from './RoomListItem.styles';
import ProfileImage from '../ProfileImage/ProfileImage';

const RoomListItem = ({ room, categories, categoriesObj }) => {
	const [clicked, setClicked] = useState(false);
	const [time, setTime] = useState('');

	const handleClick = () => {
		setClicked(prev => !prev);
	};

	const calcTimeForNow = () => {
		const now = new Date();
		const birth = new Date(room.date);

		const timeMinutes = Math.floor(
			(now.getTime() - birth.getTime()) / 1000 / 60,
		);
		if (timeMinutes < 1) return '방금전';
		if (timeMinutes < 60) return `${timeMinutes}분전`;

		const timeHours = Math.floor(timeMinutes / 60);
		if (timeHours < 24) return `${timeHours}시간 전`;

		const timeDays = Math.floor(timeMinutes / 60 / 24);
		if (timeDays < 365) return `${timeDays}일전`;

		return `${Math.floor(timeDays / 365)}년 전`;
	};

	useEffect(() => {
		setTime(calcTimeForNow());
	}, [time]);

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
