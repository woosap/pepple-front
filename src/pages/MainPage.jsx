import React, { useContext, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { OverlayContainer } from '@react-aria/overlays';
import S3FileUpload from 'react-s3';
import Header from '../components/Header/Header';
import ProfileView from '../components/ProfileView/ProfileView';
import RoomListView from '../components/RoomListView/RoomListView';
import Dialog from '../components/Dialog/Dialog';
import LoginForm from '../components/LoginForm/LoginForm';
import ProfileForm from '../components/ProfileForm/ProfileForm';
import AuthContext from '../store/auth';
import api from '../api';

const MainPage = () => {
	const { state, actions } = useContext(AuthContext);
	const { token, userId, userImg, isJoinRequired, isLoginRequired } = state;
	const { setUserImg, setIsJoinRequired, setIsLoginRequired, setToken } =
		actions;
	const [rooms, setRooms] = useState([]);

	const AWSConfig = {
		bucketName: 'pepple-profileimg',
		region: 'us-east-2',
		accessKeyId: process.env.REACT_APP_AWS_ID,
		secretAcessKey: process.env.REACT_APP_AWS_SECRET,
		headers: { 'Access-Control-Allow-Origin': '*' },
	};

	useLayoutEffect(() => {
		api
			.get(`/room?pageNumber=${0}&pageSize=${10}`)
			.then(res => {
				setRooms([...res.data]);
			})
			.catch(err => console.log(err));

		if (token) {
			setIsLoginRequired(false);
			setIsJoinRequired(false);
		}
	}, []);

	const onLoginButtonClick = service => {
		window.location.replace(
			`https://pepple.social/oauth2/authorize/${service}`,
		);
	};

	const onJoinButtonClick = (_nickname, _desc, _job, _file, _urls) => {
		if (typeof _file === 'object') {
			S3FileUpload.uploadFile(_file, AWSConfig)
				.then(res => {
					console.log(res);
					setUserImg(res.location);
				})
				.catch(err => console.warn(err));
		}
		api
			.post(`/user`, {
				imageUrl: userImg,
				job: _job,
				nickname: _nickname,
				profile: _desc,
				snsList: _urls,
				userId,
			})
			.then(res => {
				console.log(res);
				setIsJoinRequired(false);
				setToken(res.data.token);
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('user', userId);
			})
			.catch(err => console.warn(err));
		console.log(userImg, userId, _nickname, _desc, _job, _file, _urls);
	};

	const onEditButtonClick = (_nickname, _desc, _job, _file, _urls) => {
		console.log(userImg, userId, _nickname, _desc, _job, _file, _urls);
		if (typeof _file === 'object') {
			S3FileUpload.uploadFile(_file, AWSConfig)
				.then(res => {
					console.log(res);
					setUserImg(res.location);
				})
				.catch(err => console.warn(err));
		}
		api
			.put(
				`/user`,
				{
					imageUrl: userImg,
					job: _job,
					nickname: _nickname,
					profile: _desc,
					snsList: _urls,
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
			{isLoginRequired && (
				<OverlayContainer>
					<Dialog type="login">
						<LoginForm handleLoginButtonClick={onLoginButtonClick} />
					</Dialog>
				</OverlayContainer>
			)}
			{isJoinRequired && (
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
