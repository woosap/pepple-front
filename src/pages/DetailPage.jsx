import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import RoomProfileView from '../components/RoomProfileView/RoomProfileView';
import RoomMemberListView from '../components/RoomMemberListView/RoomMemberListView';
import RoomCloudView from '../components/RoomCloudView/RoomCloudView';
import MuteButton from '../components/MuteButton/MuteButton';
import RoomCloseButton from '../components/RoomCloseButton/RoomCloseButton';
import RoomContext from '../store/room';
import useAgora from '../hooks/useAgora';

const DetailPage = ({ match }) => {
	const {
		roomInfo,
		users,
		getTime,
		getRoomDetail,
		leaveRoom,
		setLocalAudioTrack,
	} = useContext(RoomContext);
	const [time, setTime] = useState('');
	const { joinChannel } = useAgora();

	useLayoutEffect(() => {
		const roomId = Number(match.params.roomId);
		const userId = localStorage.getItem('user');
		getRoomDetail(roomId);
		const agora = async () => {
			const track = await joinChannel(userId, roomId);
			setLocalAudioTrack(track);
		};
		agora();
	}, []);

	useEffect(() => {
		if (roomInfo) {
			setTime(getTime(roomInfo));
		}
	}, [roomInfo]);

	const handleLeaveRoom = () => {
		if (roomInfo) leaveRoom(roomInfo.roomId);
	};

	if (!roomInfo || !users || time === '') {
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
					<RoomProfileView title={roomInfo.title} date={time} />
					<RoomMemberListView members={users} />
					<MuteButton />
				</DetailContainer.Left>
				<DetailContainer.Right>
					<RoomCloudView />
					<RoomCloseButton handleLeaveRoom={handleLeaveRoom} />
				</DetailContainer.Right>
			</DetailContainer>
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
