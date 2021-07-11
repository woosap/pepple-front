import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RoomCloseButtonStyled from './RoomCloseButton.styles';

const RoomCloseButton = () => {
	const [clicked, setClicked] = useState(false);
	const handleClick = () => {
		setClicked(prev => !prev);
	};
	return (
		<Link to="/">
			<RoomCloseButtonStyled clicked={clicked} onClick={handleClick}>
				종료
			</RoomCloseButtonStyled>
		</Link>
	);
};

export default RoomCloseButton;
