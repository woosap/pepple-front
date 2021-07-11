import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import ProfileView from '../components/ProfileView/ProfileView';
import RoomListView from '../components/RoomListView/RoomListView';

const MainPage = ({ user, rooms, categories }) => {
	return (
		<>
			<Header />
			<MainContainer>
				<MainContainer.Left>
					<ProfileView user={user} />
				</MainContainer.Left>
				<MainContainer.Right>
					<RoomListView rooms={rooms} categories={categories} />
				</MainContainer.Right>
			</MainContainer>
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

MainContainer.Right = styled.div``;
