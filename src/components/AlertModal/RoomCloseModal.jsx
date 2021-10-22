import React from 'react';
import { OverlayContainer } from '@react-aria/overlays';
import Dialog from '../Dialog/Dialog';
import RoomCloseModalStyled from './RoomCloseModal.styles';
import { ReactComponent as CloseIcon } from '../../assets/icon/icon-close-mini.svg';

const RoomCloseModal = ({ handleLeave, handleCancle }) => {
	return (
		<OverlayContainer>
			<Dialog type="alert">
				<RoomCloseModalStyled>
					<RoomCloseModalStyled.Title>
						채팅을 종료하시겠습니까 ?<span className="icon">🤫</span>
					</RoomCloseModalStyled.Title>
					<RoomCloseModalStyled.Description>
						채팅이 종료되면 클라우드 파일은 저장되지 않습니다.
					</RoomCloseModalStyled.Description>
					<RoomCloseModalStyled.ButtonWrapper>
						<RoomCloseModalStyled.Button type="leave" onClick={handleLeave}>
							종료
						</RoomCloseModalStyled.Button>
						<RoomCloseModalStyled.Button type="cancle" onClick={handleCancle}>
							취소
						</RoomCloseModalStyled.Button>
					</RoomCloseModalStyled.ButtonWrapper>
					<CloseIcon onClick={handleCancle} />
				</RoomCloseModalStyled>
			</Dialog>
		</OverlayContainer>
	);
};

export default RoomCloseModal;
