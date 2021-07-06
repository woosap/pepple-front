import React from 'react';
import RoomListViewStyled from './RoomListView.styles';
import RoomListItem from '../RoomListItem/RoomListItem';

const RoomListView = ({ rooms }) => {
	return (
		<RoomListViewStyled>
			{rooms.map(room => (
				<RoomListItem key={room.id} room={room} />
			))}
		</RoomListViewStyled>
	);
};

export default RoomListView;
