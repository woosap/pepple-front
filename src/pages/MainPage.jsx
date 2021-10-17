import React, { useContext } from 'react';
import styled from 'styled-components';
import { OverlayContainer } from '@react-aria/overlays';
import Header from '../components/Header/Header';
import ProfileView from '../components/ProfileView/ProfileView';
import RoomListView from '../components/RoomListView/RoomListView';
import Dialog from '../components/Dialog/Dialog';
import LoginForm from '../components/LoginForm/LoginForm';
import ProfileForm from '../components/ProfileForm/ProfileForm';
import AuthContext from '../store/auth';

const MainPage = () => {
	const { joined, logined } = useContext(AuthContext).state;

	return (
		<>
			<Header />
			<MainContainer>
				<MainContainer.Left>
					<ProfileView />
				</MainContainer.Left>
				<MainContainer.Right>
					<RoomListView />
				</MainContainer.Right>
			</MainContainer>
			{!logined && (
				<OverlayContainer>
					<Dialog type="login">
						<LoginForm />
					</Dialog>
				</OverlayContainer>
			)}
			{!joined && (
				<OverlayContainer>
					<Dialog type="profile_join">
						<ProfileForm type="join" />
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
