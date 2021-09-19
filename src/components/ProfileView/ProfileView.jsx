import React, { useContext, useLayoutEffect, useState, useEffect } from 'react';
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
	const { defaultUser, jobsMapping, sns } = defaultContext.state;
	const { state, openButtonProps, openButtonRef } = useToggleDialog();
	const [clicked, setClicked] = useState(false);
	const [userData, setUserData] = useState(defaultUser);
	const [userSns, setUserSns] = useState({});

	const findSnsIcon = () => {
		const snsNames = Object.keys(sns);
		const newObj = {};
		userData.snsList.forEach(url => {
			for (let i = 0; i < snsNames.length; i += 1) {
				if (url.indexOf(snsNames[i]) > 0) {
					newObj[snsNames[i]] = { url, icon: sns[snsNames[i]] };
				} else if (i === snsNames.length - 1) {
					newObj[i] = { url, icon: sns.blog };
					break;
				}
			}
		});
		setUserSns({
			...userSns,
			...newObj,
		});
	};

	useEffect(() => {
		findSnsIcon();
	}, []);

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
	}, []);

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
				<SNSList>
					{Object.keys(userSns).map(key => (
						<SNSList.Item key={key}>
							<a href={userSns[key].url} target="_blank" rel="noreferrer">
								<img src={userSns[key].icon} alt={key} />
							</a>
						</SNSList.Item>
					))}
				</SNSList>
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
