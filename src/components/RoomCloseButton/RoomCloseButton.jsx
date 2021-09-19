import React, { useState } from 'react';
import {
	RoomCloseButtonStyled,
	RoomCloseModal,
} from './RoomCloseButton.styles';
import { ReactComponent as CloseIcon } from '../../assets/icon/icon-close-mini.svg';

const RoomCloseButton = ({ handleEndClick }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [clicked, setClicked] = useState(false);
	const handleClick = () => {
		setClicked(prev => !prev);
		setIsOpen(prev => !prev);
		handleEndClick();
	};
	return (
		<>
			<RoomCloseButtonStyled clicked={clicked} onClick={handleClick}>
				종료
			</RoomCloseButtonStyled>
			{isOpen && (
				<RoomCloseModal>
					<RoomCloseModal.Title>
						채팅을 종료하시겠습니까?
						<span className="icon">🤫</span>
					</RoomCloseModal.Title>
					<RoomCloseModal.Description>
						채팅이 종료되면 클라우드 파일은 저장되지 않습니다.
					</RoomCloseModal.Description>
					<RoomCloseModal.Button onClick={handleClick}>
						종료
					</RoomCloseModal.Button>
					<CloseIcon onClick={handleClick} />
				</RoomCloseModal>
			)}
		</>
	);
};

export default RoomCloseButton;
