import React from 'react';
import { CloseButton } from './DialogCloseButton.styles';
import { ReactComponent as CloseIcon } from '../../assets/icon/icon-close.svg';

const DialogCloseButton = ({ onCloseButton }) => (
	<CloseButton onClick={onCloseButton}>
		<CloseIcon />
	</CloseButton>
);

export default DialogCloseButton;
