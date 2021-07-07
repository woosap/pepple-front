import React from 'react';
import { OverlayContainer } from '@react-aria/overlays';
import {
	RoomListViewStyled,
	RoomList,
	CreateNewRoomButton,
} from './RoomListView.styles';
import useToggleDialog from '../../hooks/useToggleDialog';
import Dialog from '../Dialog/Dialog';
import DialogCloseButton from '../Dialog/DialogCloseButton';
import RoomListItem from '../RoomListItem/RoomListItem';

const RoomListView = ({ rooms }) => {
	const { state, openButtonProps, openButtonRef } = useToggleDialog();

	return (
		<>
			<RoomListViewStyled>
				<RoomList>
					{rooms.map(room => (
						<RoomListItem key={room.id} room={room} />
					))}
				</RoomList>
				<CreateNewRoomButton {...openButtonProps} ref={openButtonRef}>
					방 새로 만들기
				</CreateNewRoomButton>
			</RoomListViewStyled>
			{state.isOpen && (
				<OverlayContainer>
					<Dialog onClose={state.close}>
						<DialogCloseButton onCloseButton={state.close} />
					</Dialog>
				</OverlayContainer>
			)}
		</>
	);
};

export default RoomListView;
