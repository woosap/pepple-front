import React from 'react';
import {
	RoomListViewStyled,
	RoomList,
	CreateNewRoomButton,
} from './RoomListView.styles';
import RoomListItem from '../RoomListItem/RoomListItem';

const RoomListView = ({ rooms }) => {
	return (
		<RoomListViewStyled>
			<RoomList>
				{rooms.map(room => (
					<RoomListItem key={room.id} room={room} />
				))}
			</RoomList>
			<CreateNewRoomButton>방 새로 만들기</CreateNewRoomButton>
		</RoomListViewStyled>
	);
};

export default RoomListView;
