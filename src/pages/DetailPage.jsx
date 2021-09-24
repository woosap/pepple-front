import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import RoomProfileView from '../components/RoomProfileView/RoomProfileView';
import RoomMemberListView from '../components/RoomMemberListView/RoomMemberListView';
import RoomCloudView from '../components/RoomCloudView/RoomCloudView';
import MuteButton from '../components/MuteButton/MuteButton';
import RoomCloseButton from '../components/RoomCloseButton/RoomCloseButton';
import RoomContext from '../store/room';

const DetailPage = ({ match }) => {
	const { roomInfo, users, getTime, getRoomDetail } = useContext(RoomContext);
	const [time, setTime] = useState('');

	useLayoutEffect(() => {
		getRoomDetail(Number(match.params.roomId));
	}, []);

	useEffect(() => {
		if (roomInfo) {
			setTime(getTime(roomInfo));
		}
	}, [roomInfo]);

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
					<RoomCloseButton />
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
