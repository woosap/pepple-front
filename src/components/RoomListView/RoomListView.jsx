import React, { useState, useEffect } from 'react';
import { OverlayContainer } from '@react-aria/overlays';
import {
	RoomListViewStyled,
	RoomList,
	CreateNewRoomButton,
	Loading,
} from './RoomListView.styles';
import useToggleDialog from '../../hooks/useToggleDialog';
import Dialog from '../Dialog/Dialog';
import DialogCloseButton from '../Dialog/DialogCloseButton';
import RoomListItem from '../RoomListItem/RoomListItem';
import CreateRoomForm from '../CreateRoomForm/CreateRoomForm';

const RoomListView = ({ roomList, categories, onCreateRoom }) => {
	const { state, openButtonProps, openButtonRef } = useToggleDialog();
	const [clicked, setClicked] = useState(false);
	const [rooms, setRooms] = useState(roomList);

	useEffect(() => {
		setRooms(roomList);
	}, [roomList]);

	const handleClose = () => {
		state.close();
		setClicked(false);
	};

	const handleClick = () => {
		setClicked(prev => !prev);
	};

	const handleSubmit = (categoryList, title, subtitle, capacity) => {
		onCreateRoom(categoryList, title, subtitle, capacity);
	};

	if (!rooms) {
		return (
			<Loading>
				<p>
					방 목록을 불러오는 중 에러가 발생했어요 😢 잠시 후 다시 시도해주세요
				</p>
			</Loading>
		);
	}

	if (rooms.length === 0) {
		return (
			<>
				<Loading>
					<p>현재 존재하는 방이 없어요! 새로운 방을 만들어주세요</p>
				</Loading>
				<CreateNewRoomButton
					{...openButtonProps}
					ref={openButtonRef}
					onClick={handleClick}
					clicked={clicked}
				>
					방 새로 만들기
				</CreateNewRoomButton>
				{state.isOpen && (
					<OverlayContainer>
						<Dialog onClose={handleClose}>
							<CreateRoomForm
								categories={categories}
								handleSubmit={handleSubmit}
							/>
							<DialogCloseButton onCloseButton={handleClose} />
						</Dialog>
					</OverlayContainer>
				)}
			</>
		);
	}

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
						<CreateRoomForm
							categories={categories}
							handleSubmit={handleSubmit}
						/>
						<DialogCloseButton onCloseButton={handleClose} />
					</Dialog>
				</OverlayContainer>
			)}
		</>
	);
};

export default RoomListView;
