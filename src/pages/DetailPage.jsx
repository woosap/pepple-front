import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import RoomProfileView from '../components/RoomProfileView/RoomProfileView';
import RoomMemberListView from '../components/RoomMemberListView/RoomMemberListView';
import RoomCloudView from '../components/RoomCloudView/RoomCloudView';
import MuteButton from '../components/MuteButton/MuteButton';

const DetailPage = ({ members }) => {
	return (
		<>
			<Header />
			<DetailContainer>
				<DetailContainer.Left>
					<RoomProfileView />
					<RoomMemberListView members={members} />
					<MuteButton />
				</DetailContainer.Left>
				<DetailContainer.Right>
					<RoomCloudView />
				</DetailContainer.Right>
			</DetailContainer>
		</>
	);
};

export default DetailPage;

DetailPage.defaultProps = {
	members: [
		{ id: 1, name: '쭈꾸미 개발자', job: '프론트엔드 개발자' },
		{ id: 2, name: '쭈꾸미 개발자', job: '프론트엔드 개발자' },
		{ id: 3, name: '쭈꾸미 개발자', job: '프론트엔드 개발자' },
		{ id: 4, name: '쭈꾸미 개발자', job: '프론트엔드 개발자' },
		{ id: 5, name: '쭈꾸미 개발자', job: '프론트엔드 개발자' },
		{ id: 6, name: '쭈꾸미 개발자', job: '프론트엔드 개발자' },
	],
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
	width: 15%;
`;
