import React, { useState } from 'react';
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
import CreateRoomForm from '../CreateRoomForm/CreateRoomForm';

const RoomListView = ({ rooms, categories }) => {
	const { state, openButtonProps, openButtonRef } = useToggleDialog();
	const [clicked, setClicked] = useState(false);

	const handleClose = () => {
		state.close();
		setClicked(false);
	};

	const handleClick = () => {
		setClicked(prev => !prev);
	};

	return (
		<>
			<RoomListViewStyled>
				<RoomList>
					{rooms.map(room => (
						<RoomListItem
							key={room.id}
							room={room}
							categories={room.categories}
							categoriesObj={categories}
						/>
					))}
				</RoomList>
				<CreateNewRoomButton
					{...openButtonProps}
					ref={openButtonRef}
					onClick={handleClick}
					clicked={clicked}
				>
					방 새로 만들기
				</CreateNewRoomButton>
			</RoomListViewStyled>
			{state.isOpen && (
				<OverlayContainer>
					<Dialog onClose={handleClose}>
						<CreateRoomForm categories={categories} />
						<DialogCloseButton onCloseButton={handleClose} />
					</Dialog>
				</OverlayContainer>
			)}
		</>
	);
};

export default RoomListView;
