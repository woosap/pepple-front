import React, { useContext, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { OverlayContainer } from '@react-aria/overlays';
import Header from '../components/Header/Header';
import ProfileView from '../components/ProfileView/ProfileView';
import RoomListView from '../components/RoomListView/RoomListView';
import Dialog from '../components/Dialog/Dialog';
import LoginForm from '../components/LoginForm/LoginForm';
import ProfileForm from '../components/ProfileForm/ProfileForm';
import AuthContext from '../store/auth';
import api from '../api';

const MainPage = () => {
	const authContext = useContext(AuthContext);
	const { token, userId, joined, logined } = authContext.state;
	const [rooms, setRooms] = useState([]);

	useLayoutEffect(() => {
		api
			.get(`/room?pageNumber=${0}&pageSize=${10}`)
			.then(res => {
				setRooms([...res.data]);
			})
			.catch(err => console.log(err));
	}, []);

	const onLoginButtonClick = service => {
		authContext.login(service);
	};

	const onJoinButtonClick = (nickname, description, job, file, snsList) => {
		authContext.join(nickname, description, job, file, snsList);
	};

	const onEditButtonClick = (nickname, description, job, file, snsList) => {
		authContext.edit(nickname, description, job, file, snsList);
	};

	const onCreateRoom = (categoryList, _title, _subtitle, _capacity) => {
		api
			.post(
				`/room/create`,
				{
					title: _title,
					subTitle: _subtitle,
					capacity: _capacity,
					category: categoryList,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};

	const onRoomClick = roomId => {
		api
			.post(
				`/room/enter`,
				{
					roomId,
					userId,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};

	return (
		<>
			<Header />
			<MainContainer>
				<MainContainer.Left>
					<ProfileView handleEditButtonClick={onEditButtonClick} />
				</MainContainer.Left>
				<MainContainer.Right>
					<RoomListView
						roomList={rooms}
						onCreateRoom={onCreateRoom}
						onRoomClick={onRoomClick}
					/>
				</MainContainer.Right>
			</MainContainer>
			{!logined && (
				<OverlayContainer>
					<Dialog type="login">
						<LoginForm handleLoginButtonClick={onLoginButtonClick} />
					</Dialog>
				</OverlayContainer>
			)}
			{!joined && (
				<OverlayContainer>
					<Dialog type="profile_join">
						<ProfileForm
							type="join"
							handleJoinButtonClick={onJoinButtonClick}
						/>
					</Dialog>
				</OverlayContainer>
			)}
		</>
	);
};

export default MainPage;

export const MainContainer = styled.div`
	display: flex;
	overflow: auto;
	margin: 44px 0 0 0;
`;

MainContainer.Left = styled.div``;

MainContainer.Right = styled.div`
	width: 100%;
`;
