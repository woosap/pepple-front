import React, { useState, useContext, useEffect } from 'react';
import { OverlayContainer } from '@react-aria/overlays';
import {
	RoomListViewStyled,
	RoomList,
	CreateNewRoomButton,
	Loading,
	AlertModal,
} from './RoomListView.styles';
import useToggleDialog from '../../hooks/useToggleDialog';
import Dialog from '../Dialog/Dialog';
import DialogCloseButton from '../Dialog/DialogCloseButton';
import RoomListItem from '../RoomListItem/RoomListItem';
import CreateRoomForm from '../CreateRoomForm/CreateRoomForm';
import RoomContext from '../../store/room';
import { useRoomListData } from '../../hooks/useRoomData';
import { ReactComponent as CloseIcon } from '../../assets/icon/icon-close-mini.svg';

const RoomListView = () => {
	const { getRoomListData } = useRoomListData();
	const { error, setError } = useContext(RoomContext);
	const { state, openButtonProps, openButtonRef } = useToggleDialog();
	const [clicked, setClicked] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => {
		state.close();
		setClicked(false);
	};

	const handleClick = () => {
		setClicked(prev => !prev);
	};

	const handleAlertClick = () => {
		setIsOpen(false);
		setClicked(false);
		setError(false);
	};

	useEffect(() => {
		if (error) setIsOpen(true);
	}, [error]);

	if (!getRoomListData.data) {
		return (
			<Loading>
				<p>로딩 중입니다...</p>
			</Loading>
		);
	}

	if (getRoomListData.error && !getRoomListData.data) {
		return (
			<Loading>
				<p>
					방 목록을 불러오는 중 에러가 발생했어요 😢 잠시 후 다시 시도해주세요
				</p>
			</Loading>
		);
	}

	if (getRoomListData.data.length === 0) {
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
						<Dialog type="create" onClose={handleClose}>
							<CreateRoomForm onClose={handleClose} />
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
					{getRoomListData.data.map(room => (
						<RoomListItem
							key={room.roomId}
							room={room}
							categories={room.category}
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
					<Dialog type="create" onClose={handleClose}>
						<CreateRoomForm onClose={handleClose} />
						<DialogCloseButton onCloseButton={handleClose} />
					</Dialog>
				</OverlayContainer>
			)}
			{isOpen && (
				<OverlayContainer>
					<Dialog type="alert">
						<AlertModal>
							<AlertModal.Title>방이 가득 찼어요 !</AlertModal.Title>
							<AlertModal.Description>
								다른 방에 입장하거나 새로운 방을 만들어 주세요.
							</AlertModal.Description>
							<AlertModal.Button onClick={handleAlertClick}>
								확인
							</AlertModal.Button>
							<CloseIcon onClick={handleAlertClick} />
						</AlertModal>
					</Dialog>
				</OverlayContainer>
			)}
		</>
	);
};

export default RoomListView;
