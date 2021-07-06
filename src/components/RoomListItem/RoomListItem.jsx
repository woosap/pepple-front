import React from 'react';
import { RoomListItemStyled, RoomListItemBox } from './RoomListItem.styles';

const RoomListItem = () => {
	return (
		<RoomListItemStyled>
			<RoomListItemBox>
				<RoomListItemBox.Title />
				<RoomListItemBox.Subtitle />
				<RoomListItemBox.BirthTime />
			</RoomListItemBox>
		</RoomListItemStyled>
	);
};

export default RoomListItem;
