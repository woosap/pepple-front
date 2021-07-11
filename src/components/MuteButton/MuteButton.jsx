import React, { useState } from 'react';
import MuteButtonStyled from './MuteButton.styles';

const MuteButton = () => {
	const [isMute, setIsMute] = useState(true);
	const handleMuteClick = () => {
		setIsMute(prev => !prev);
	};
	return (
		<MuteButtonStyled isMute={isMute} onClick={handleMuteClick}>
			{isMute ? '음성 켜기' : '음성 끄기'}
		</MuteButtonStyled>
	);
};

export default MuteButton;
