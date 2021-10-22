import React from 'react';
import AlertModalStyled from './AlertModal.styles';
import { ReactComponent as CloseIcon } from '../../assets/icon/icon-close-mini.svg';

const AlertModal = ({ error, handleClick }) => {
	return (
		<AlertModalStyled>
			<AlertModalStyled.Title>에러가 발생했어요! 😢</AlertModalStyled.Title>
			<AlertModalStyled.Description>{error}</AlertModalStyled.Description>
			<AlertModalStyled.Button onClick={handleClick}>
				확인
			</AlertModalStyled.Button>
			<CloseIcon onClick={handleClick} />
		</AlertModalStyled>
	);
};

export default AlertModal;
