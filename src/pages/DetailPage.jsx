import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import RoomProfileView from '../components/RoomProfileView/RoomProfileView';
import RoomMemberListView from '../components/RoomMemberListView/RoomMemberListView';
import RoomCloudView from '../components/RoomCloudView/RoomCloudView';
import MuteButton from '../components/MuteButton/MuteButton';
import CustomPrompt from '../components/Prompt/CustomPrompt';
import RoomContext from '../store/room';
import { useRoomData } from '../hooks/useRoomData';
import RoomCloseModal from '../components/RoomCloseModal/RoomCloseModal';
import { RoomCloseButtonStyled } from '../components/RoomCloseButton/RoomCloseButton.styles';

const DetailPage = ({ match }) => {
	const { getRoomData } = useRoomData(match.params.roomId);
	const { getTime, leaveRoom } = useContext(RoomContext);
	const [clicked, setClicked] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [shouldConfirm, setShouldConfirm] = useState(true);

	const handleLeaveRoom = () => {
		leaveRoom(match.params.roomId);
	};

	const handleClick = () => {
		setClicked(prev => !prev);
		setShouldConfirm(prev => !prev);
		setIsOpen(prev => !prev);
	};

	if (getRoomData.error) {
		return (
			<>
				<Header />
				<DetailContainer>
					<ErrorMessage>
						앗! 에러가 발생했어요. 잠시 후 다시 시도해주세요.
					</ErrorMessage>
				</DetailContainer>
			</>
		);
	}

	if (!getRoomData.data && !getRoomData.error) {
		return (
			<>
				<Header />
				<DetailContainer>
					<ErrorMessage>로딩 중입니다...</ErrorMessage>
				</DetailContainer>
			</>
		);
	}

	return (
		<>
			<Header />
			<DetailContainer>
				<DetailContainer.Left>
					<RoomProfileView
						title={getRoomData.data.roomInfo.title}
						date={getTime(getRoomData.data.roomInfo)}
					/>
					<RoomMemberListView members={getRoomData.data.users} />
					<MuteButton />
				</DetailContainer.Left>
				<DetailContainer.Right>
					<RoomCloudView />
					<RoomCloseButtonStyled clicked={clicked} onClick={handleClick}>
						종료
					</RoomCloseButtonStyled>
					{isOpen && (
						<RoomCloseModal
							handleLeave={handleLeaveRoom}
							handleCancle={handleClick}
						/>
					)}
				</DetailContainer.Right>
			</DetailContainer>
			<CustomPrompt
				match={match}
				shouldConfirm={shouldConfirm}
				handleLeaveRoom={handleLeaveRoom}
			/>
		</>
	);
};

export default DetailPage;

export const DetailContainer = styled.div`
	display: flex;
	justify-content: center;
	overflow: auto;
	margin: 0 auto;
`;

DetailContainer.Left = styled.div`
	width: 60%;
	position: relative;
`;

DetailContainer.Right = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin: 40px 0 0 30px;
	width: 15%;
	position: relative;
`;

export const ErrorMessage = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 100px;
	margin-left: -53px;
	font-size: 18px;
	color: #111862;
	letter-spacing: -0.05em;
`;
