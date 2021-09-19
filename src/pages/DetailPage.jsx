import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../components/Header/Header';
import RoomProfileView from '../components/RoomProfileView/RoomProfileView';
import RoomMemberListView from '../components/RoomMemberListView/RoomMemberListView';
import RoomCloudView from '../components/RoomCloudView/RoomCloudView';
import MuteButton from '../components/MuteButton/MuteButton';
import RoomCloseButton from '../components/RoomCloseButton/RoomCloseButton';
import AuthContext from '../store/auth';

const DetailPage = ({ room, members, resources, categories }) => {
	const authContext = useContext(AuthContext);
	const { token, userId } = authContext.state;

	const onEndClick = () => {
		axios
			.post(
				`http://3.36.118.216:8080/room/enter`,
				{
					roomId: room.roomId,
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
			<DetailContainer>
				<DetailContainer.Left>
					<RoomProfileView room={room} categories={categories} />
					<RoomMemberListView members={members} />
					<MuteButton />
				</DetailContainer.Left>
				<DetailContainer.Right>
					<RoomCloudView resources={resources} />
					<RoomCloseButton handleEndClick={onEndClick} />
				</DetailContainer.Right>
			</DetailContainer>
		</>
	);
};

export default DetailPage;

DetailPage.defaultProps = {
	room: {
		id: 1,
		title: '+사이드 프로젝트+',
		subtitle: '수다 떨면서 함께해요',
		birthTime: '17시간 전',
		categories: ['PROJECT', 'DEVELOPMENT'],
	},
	members: [
		{ id: 1, name: '쭈꾸미 개발자', job: '프론트엔드 개발자' },
		{ id: 2, name: '쭈꾸미 개발자', job: '프론트엔드 개발자' },
		{ id: 3, name: '쭈꾸미 개발자', job: '프론트엔드 개발자' },
		{ id: 4, name: '쭈꾸미 개발자', job: '프론트엔드 개발자' },
		{ id: 5, name: '쭈꾸미 개발자', job: '프론트엔드 개발자' },
		{ id: 6, name: '쭈꾸미 개발자', job: '프론트엔드 개발자' },
	],
	resources: [
		{
			id: 1,
			path: 'https://github.com/woosap/pepple-front',
			uploader: '쭈꾸미 개발자',
			uploadedTime: '55분',
		},
		{
			id: 2,
			path: 'https://github.com/woosap/pepple-front',
			uploader: '쭈꾸미 개발자',
			uploadedTime: '55분',
		},
		{
			id: 3,
			path: 'https://github.com/woosap/pepple-front',
			uploader: '쭈꾸미 개발자',
			uploadedTime: '55분',
		},
		{
			id: 4,
			path: 'https://github.com/woosap/pepple-front',
			uploader: '쭈꾸미 개발자',
			uploadedTime: '55분',
		},
		{
			id: 5,
			path: 'https://github.com/woosap/pepple-front',
			uploader: '쭈꾸미 개발자',
			uploadedTime: '55분',
		},
	],
	categories: {
		DESIGN: { id: 1, ko: '디자인' },
		DEVELOPMENT: { id: 2, ko: '개발' },
		PROJECT: { id: 3, ko: '프로젝트' },
		STUDY: { id: 4, ko: '스터디' },
	},
};

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
