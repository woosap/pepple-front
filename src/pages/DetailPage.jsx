import React, { useContext, useState, useLayoutEffect } from 'react';
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
import useAgora from '../hooks/useAgora';

const DetailPage = ({ match, history }) => {
	const { getRoomData } = useRoomData(match.params.roomId);
	const { getTime, leaveRoom } = useContext(RoomContext);
	const { tracks, joinChannel } = useAgora();
	const [clicked, setClicked] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [shouldConfirm, setShouldConfirm] = useState(true);

	useLayoutEffect(() => {
		getRoomData.mutate();
		if (!tracks || Object.keys(tracks).length === 0) {
			const userId = localStorage.getItem('user');
			const { roomId } = match.params;
			joinChannel(userId, roomId);
		}
	}, []);

	const handleLeaveRoom = () => {
		leaveRoom(match.params.roomId);
	};

	const handleClick = () => {
		setClicked(prev => !prev);
		setShouldConfirm(prev => !prev);
		setIsOpen(prev => !prev);
	};

	const handleReturn = () => {
		history.replace('/');
	};

	// 서버 에러인지 사용자 에러인지 명시해주면 좋을 것 같음
	if (getRoomData.error) {
		return (
			<>
				<Header />
				<ErrorMessage>
					앗! 에러가 발생했어요. 잠시 후 다시 시도해주세요.
					<button type="button" onClick={handleReturn}>{`< 돌아가기`}</button>
				</ErrorMessage>
			</>
		);
	}

	if (!getRoomData.data && !getRoomData.error) {
		return (
			<>
				<Header />
				<ErrorMessage>로딩 중입니다...</ErrorMessage>
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
					<RoomCloseButtonStyled
						className="closeButton"
						clicked={clicked}
						onClick={handleClick}
					>
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
	position: relative;
	min-height: 700px;

	@media all and (max-width: 1023px) {
		flex-direction: column;
		align-items: center;
	}
`;

DetailContainer.Left = styled.div`
	width: calc(80vw - 160px);
	max-width: 1000px;
	position: relative;

	@media all and (max-width: 1023px) {
		width: 80vw;
	}
`;

DetailContainer.Right = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin: 40px 0 0 30px;
	width: 15%;
	position: relative;
	height: 70vh;
	max-height: 750px;
	min-height: 630px;
	@media all and (max-width: 1023px) {
		width: 80vw;
		margin: 24px 0 0 0;
		height: 150px;
		min-height: 150px;
		.closeButton {
			margin-top: -220px;
			width: 121px;
			height: 40px;
		}
	}
`;

export const ErrorMessage = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 100px;
	font-size: 18px;
	color: #111862;
	letter-spacing: -0.05em;

	button {
		font-size: inherit;
		background: none;
		margin-top: 50px;
		cursor: pointer;
		text-decoration: underline;
		color: #666;

		:hover {
			color: #111862;
		}
	}
`;

ErrorMessage.Button = styled.button``;
