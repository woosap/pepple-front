import React, { useContext, useLayoutEffect, useState } from 'react';
import axios from 'axios';
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

const MainPage = ({ categories }) => {
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
		axios
			.get(`http://3.36.118.216:8080/room?pageNumber=${0}&pageSize=${10}`)
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
			`http://3.36.118.216:8080/oauth2/authorize/${service}`,
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
		axios
			.post(`http://3.36.118.216:8080/user`, {
				imageUrl: userImg,
				job: 'FRONTEND',
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

	const onCreateRoom = (categoryList, _title, _subtitle, _capacity) => {
		axios
			.post(
				`http://3.36.118.216:8080/room/create`,
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

	return (
		<>
			<Header />
			<MainContainer>
				<MainContainer.Left>
					<ProfileView />
				</MainContainer.Left>
				<MainContainer.Right>
					<RoomListView
						roomList={rooms}
						categories={categories}
						onCreateRoom={onCreateRoom}
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

MainPage.defaultProps = {
	user: {
		id: 1,
		name: '쭈꾸미 개발자',
		job: 'FRONTEND',
		description:
			'쭈꾸미처럼 맛있게 성장하고 싶은 쭈꾸미 프론트엔드 개발자 입니다. 쭈꾸미처럼 맛있게 성장하고 싶은 쭈꾸미 프론트엔드 개발자 입니다',
		sns: [
			{ id: 1, sort: 'blog', link: 'blog_link' },
			{ id: 2, sort: 'github', link: 'github_link' },
			{ id: 3, sort: 'instagram', link: 'instagram_link' },
			{ id: 4, sort: 'facebook', link: 'facebook_link' },
		],
	},
	categories: {
		DESIGN: { id: 1, title: '디자인', value: 'DESIGN' },
		DEVELOP: { id: 2, title: '개발', value: 'DEVELOP' },
		PROJECT: { id: 3, title: '프로젝트', value: 'PROJECT' },
		STUDY: { id: 4, title: '스터디', value: 'STUDY' },
	},
};

export const MainContainer = styled.div`
	display: flex;
	overflow: auto;
	margin: 44px 0 0 0;
`;

MainContainer.Left = styled.div``;

MainContainer.Right = styled.div`
	width: 100%;
`;
