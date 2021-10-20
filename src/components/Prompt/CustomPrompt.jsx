import React, { useState } from 'react';
import { Prompt } from 'react-router-dom';
import { OverlayContainer } from '@react-aria/overlays';
import CustomModalStyled from './CustomPrompt.styles';
import Dialog from '../Dialog/Dialog';
import { ReactComponent as CloseIcon } from '../../assets/icon/icon-close-mini.svg';

const CustomPrompt = ({ shouldConfirm, handleLeaveRoom }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [location, setLocation] = useState(null);

	const handleNavigation = nextLocation => {
		console.log(nextLocation);
		if (shouldConfirm && !isConfirmed) {
			setModalOpen(true);
			setLocation(nextLocation);
			return false;
		}
		return true;
	};

	const handleCancle = () => {
		setModalOpen(false);
	};

	const handleLeave = () => {
		if (location) {
			setIsConfirmed(true);
			handleLeaveRoom();
		}
	};

	return (
		<>
			<Prompt when={shouldConfirm} message={handleNavigation} />
			{modalOpen && (
				<OverlayContainer>
					<Dialog type="alert">
						<CustomModalStyled>
							<CustomModalStyled.Title>
								채팅을 종료하시겠습니까 ?<span className="icon">🤫</span>
							</CustomModalStyled.Title>
							<CustomModalStyled.Description>
								채팅이 종료되면 클라우드 파일은 저장되지 않습니다.
							</CustomModalStyled.Description>
							<CustomModalStyled.ButtonWrapper>
								<CustomModalStyled.Button type="leave" onClick={handleLeave}>
									나가기
								</CustomModalStyled.Button>
								<CustomModalStyled.Button type="cancle" onClick={handleCancle}>
									취소
								</CustomModalStyled.Button>
							</CustomModalStyled.ButtonWrapper>
							<CloseIcon onClick={handleCancle} />
						</CustomModalStyled>
					</Dialog>
				</OverlayContainer>
			)}
		</>
	);
};

export default CustomPrompt;
