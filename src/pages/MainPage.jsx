import React, { useContext, useEffect } from 'react';
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
	const { setUserImg, setIsJoinRequired, setIsLoginRequired } = actions;

	const rooms = [];

	const AWSConfig = {
		bucketName: 'pepple-profileimg',
		region: 'us-east-2',
		accessKeyId: process.env.REACT_APP_AWS_ID,
		secretAcessKey: process.env.REACT_APP_AWS_SECRET,
		headers: { 'Access-Control-Allow-Origin': '*' },
	};

	useEffect(() => {
		axios
			.get(`http://3.36.118.216:8080/room?pageNumber=${0}&pageSize=${10}`)
			.then(res => {
				rooms.push(...res.data);
			})
			.catch(err => console.log(err));

		if (token) {
			setIsLoginRequired(false);
			setIsJoinRequired(false);
		}
	});

	const onLoginButtonClick = service => {
		window.location.replace(
			`http://3.36.118.216:8080/oauth2/authorize/${service}`,
		);
	};

	const onJoinButtonClick = (_nickname, _desc, _job, _file, _urls) => {
		S3FileUpload.uploadFile(_file, AWSConfig)
			.then(res => {
				console.log(res);
				setUserImg(res.location);
			})
			.catch(err => console.warn(err));
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
			})
			.catch(err => console.warn(err));
		console.log(userImg, userId, _nickname, _desc, _job, _file, _urls);
	};

	const onCreateRoom = (categoryList, _title, _subtitle, _capacity) => {
		console.log(_title, _subtitle, _capacity, token);
		axios
			.post(
				`http://3.36.118.216:8080/room/create`,
				{
					title: _title,
					sub_title: _subtitle,
					capacity: _capacity,
					category: ['DEVELOP', 'STUDY'],
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
	rooms: [
		{
			id: 1,
			title: '+사이드 프로젝트+',
			subtitle: '수다 떨면서 함께해요',
			birthTime: '1시간 전',
			member: ['seomoon', 'wonchoi'],
			categories: ['PROJECT', 'DEVELOPMENT'],
		},
		{
			id: 2,
			title: '+사이드 프로젝트+',
			subtitle: '수다 떨면서 함께해요',
			birthTime: '1시간 전',
			member: ['seomoon', 'wonchoi'],
			categories: ['DESIGN', 'STUDY'],
		},
		{
			id: 3,
			title: '+사이드 프로젝트+',
			subtitle: '수다 떨면서 함께해요',
			birthTime: '1시간 전',
			member: ['seomoon', 'wonchoi'],
			categories: ['PROJECT', 'DEVELOPMENT'],
		},
		{
			id: 4,
			title: '+사이드 프로젝트+',
			subtitle: '수다 떨면서 함께해요',
			birthTime: '1시간 전',
			member: ['seomoon', 'wonchoi'],
			categories: ['DESIGN', 'STUDY'],
		},
		{
			id: 5,
			title: '+사이드 프로젝트+',
			subtitle: '수다 떨면서 함께해요',
			birthTime: '1시간 전',
			member: ['seomoon', 'wonchoi'],
			categories: ['PROJECT', 'DEVELOPMENT'],
		},
		{
			id: 6,
			title: '+사이드 프로젝트+',
			subtitle: '수다 떨면서 함께해요',
			birthTime: '1시간 전',
			member: ['seomoon', 'wonchoi'],
			categories: ['DESIGN', 'STUDY'],
		},
		{
			id: 7,
			title: '+사이드 프로젝트+',
			subtitle: '수다 떨면서 함께해요',
			birthTime: '1시간 전',
			member: ['seomoon', 'wonchoi'],
			categories: ['PROJECT', 'DEVELOPMENT'],
		},
		{
			id: 8,
			title: '+사이드 프로젝트+',
			subtitle: '수다 떨면서 함께해요',
			birthTime: '1시간 전',
			member: ['seomoon', 'wonchoi'],
			categories: ['DESIGN', 'STUDY'],
		},
		{
			id: 9,
			title: '+사이드 프로젝트+',
			subtitle: '수다 떨면서 함께해요',
			birthTime: '1시간 전',
			member: ['seomoon', 'wonchoi'],
			categories: ['PROJECT', 'DEVELOPMENT'],
		},
	],
	categories: {
		DESIGN: { id: 1, ko: '디자인' },
		DEVELOPMENT: { id: 2, ko: '개발' },
		PROJECT: { id: 3, ko: '프로젝트' },
		STUDY: { id: 4, ko: '스터디' },
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
