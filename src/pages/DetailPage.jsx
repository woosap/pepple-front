import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import RoomProfileView from '../components/RoomProfileView/RoomProfileView';
import RoomMemberListView from '../components/RoomMemberListView/RoomMemberListView';
import RoomCloudView from '../components/RoomCloudView/RoomCloudView';

const DetailPage = () => {
	return (
		<>
			<Header />
			<DetailContainer>
				<DetailContainer.Left>
					<RoomProfileView />
					<RoomMemberListView />
				</DetailContainer.Left>
				<DetailContainer.Right>
					<RoomCloudView />
				</DetailContainer.Right>
			</DetailContainer>
		</>
	);
};

export default DetailPage;

export const DetailContainer = styled.div`
	display: flex;
	overflow: auto;
`;

DetailContainer.Left = styled.div``;

DetailContainer.Right = styled.div``;
