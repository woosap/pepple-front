import React, { useContext, useLayoutEffect, useState } from 'react';
import { OverlayContainer } from '@react-aria/overlays';
import axios from 'axios';
import Dialog from '../Dialog/Dialog';
import {
	ProfileViewStyled,
	UserInfo,
	ModifyProfileButton,
	SNSList,
} from './ProfileView.styles';
import ProfileImage from '../ProfileImage/ProfileImage';
import DialogCloseButton from '../Dialog/DialogCloseButton';
import useToggleDialog from '../../hooks/useToggleDialog';
import ProfileForm from '../ProfileForm/ProfileForm';
import AuthContext from '../../store/auth';
import DefaultContext from '../../store/default';

const ProfileView = () => {
	const authContext = useContext(AuthContext);
	const defaultContext = useContext(DefaultContext);
	const { token } = authContext.state;
	const { defaultUser, jobsMapping } = defaultContext.state;
	const { state, openButtonProps, openButtonRef } = useToggleDialog();
	const [clicked, setClicked] = useState(false);
	const [userData, setUserData] = useState(defaultUser);

	useLayoutEffect(() => {
		const fetchUserData = async () => {
			await axios
				.get(`http://3.36.118.216:8080/auth/detail`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(res => {
					setUserData(res.data);
				})
				.catch(err => console.log(err));
		};
		fetchUserData();
	}, [userData]);

	const handleClick = () => {
		setClicked(prev => !prev);
	};

	const handleClose = () => {
		state.close();
		setClicked(prev => !prev);
	};

	return (
		<>
			<ProfileViewStyled>
				<ProfileImage url={userData.imageUrl} size="big" />
				<UserInfo>
					<UserInfo.Name>{userData.nickname}</UserInfo.Name>
					<UserInfo.Job>{jobsMapping[userData.job]}</UserInfo.Job>
					<UserInfo.Description>{userData.profile}</UserInfo.Description>
				</UserInfo>
				<ModifyProfileButton
					{...openButtonProps}
					ref={openButtonRef}
					clicked={clicked}
					onClick={handleClick}
				>
					개인정보 수정
				</ModifyProfileButton>
				<SNSList />
			</ProfileViewStyled>
			{state.isOpen && (
				<OverlayContainer>
					<Dialog type="profile_edit" onClose={handleClose}>
						<ProfileForm />
						<DialogCloseButton onCloseButton={handleClose} />
					</Dialog>
				</OverlayContainer>
			)}
		</>
	);
};

export default ProfileView;
