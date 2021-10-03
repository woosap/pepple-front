import React, { useContext } from 'react';
import MuteButtonStyled from './MuteButton.styles';
import RoomContext from '../../store/room';

const MuteButton = () => {
	const { mute, handleMute } = useContext(RoomContext);
	const handleClick = () => {
		handleMute();
	};

	return (
		<MuteButtonStyled isMute={mute} onClick={handleClick}>
			{mute ? '음성 켜기' : '음성 끄기'}
		</MuteButtonStyled>
	);
};

export default MuteButton;
