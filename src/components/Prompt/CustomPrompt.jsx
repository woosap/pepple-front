import React, { useState } from 'react';
import { Prompt } from 'react-router-dom';
import RoomCloseModal from '../RoomCloseModal/RoomCloseModal';

const CustomPrompt = ({ match, shouldConfirm, handleLeaveRoom }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [location, setLocation] = useState(null);

	const handleNavigation = nextLocation => {
		if (nextLocation.pathname === match.url) return true;
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
				<RoomCloseModal handleLeave={handleLeave} handleCancle={handleCancle} />
			)}
		</>
	);
};

export default CustomPrompt;
