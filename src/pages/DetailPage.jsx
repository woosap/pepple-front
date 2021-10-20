import React, { useContext, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import RoomProfileView from '../components/RoomProfileView/RoomProfileView';
import RoomMemberListView from '../components/RoomMemberListView/RoomMemberListView';
import RoomCloudView from '../components/RoomCloudView/RoomCloudView';
import MuteButton from '../components/MuteButton/MuteButton';
import CustomPrompt from '../components/Prompt/CustomPrompt';
import RoomContext from '../store/room';
import { useRoomData } from '../hooks/useRoomData';
import useAgora from '../hooks/useAgora';
import RoomCloseModal from '../components/RoomCloseModal/RoomCloseModal';
import { RoomCloseButtonStyled } from '../components/RoomCloseButton/RoomCloseButton.styles';

const DetailPage = ({ match }) => {
	const { getRoomData } = useRoomData(match.params.roomId);
	const { getTime, leaveRoom, setLocalAudioTrack } = useContext(RoomContext);
	const { joinChannel } = useAgora();
	const [clicked, setClicked] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [shouldConfirm, setShoudConfirm] = useState(true);

	useLayoutEffect(() => {
		const roomId = Number(match.params.roomId);
		const userId = localStorage.getItem('user');
		const agora = async () => {
			const track = await joinChannel(userId, roomId);
			setLocalAudioTrack(track);
		};
		agora();
	}, []);

	const handleLeaveRoom = () => {
		leaveRoom(match.params.roomId);
	};

	const handleClick = () => {
		setClicked(prev => !prev);
		setShoudConfirm(prev => !prev);
		setIsOpen(prev => !prev);
	};

	if (getRoomData.error) {
		return (
			<>
				<Header />
				<DetailContainer>
					앗! 에러가 발생했어요. 잠시 후 다시 시도해주세요.
				</DetailContainer>
			</>
		);
	}

	if (!getRoomData.data && !getRoomData.error) {
		return (
			<>
				<Header />
				<DetailContainer>로딩 중입니다..</DetailContainer>
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
