import React, { useContext, useLayoutEffect, useState, useEffect } from 'react';
import { OverlayContainer } from '@react-aria/overlays';
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
import DefaultImage from '../../assets/img-default.svg';
import api from '../../api';

const ProfileView = ({ handleEditButtonClick }) => {
	const { token } = useContext(AuthContext).state;
	const { defaultUser, jobsMapping, snsIcons } = useContext(DefaultContext);
	const { state, openButtonProps, openButtonRef } = useToggleDialog();
	const [clicked, setClicked] = useState(false);
	const [userData, setUserData] = useState(defaultUser);
	const [userSns, setUserSns] = useState({});

	const findSnsIcon = () => {
		const snsNames = Object.keys(snsIcons);
		const newObj = {};
		userData.snsList.forEach(url => {
			for (let i = 0; i < snsNames.length; i += 1) {
				if (url.indexOf(snsNames[i]) > 0) {
					newObj[snsNames[i]] = { url, icon: snsIcons[snsNames[i]] };
				} else if (i === snsNames.length - 1) {
					newObj[i] = { url, icon: snsIcons.blog };
					break;
				}
			}
		});
		setUserSns({
			...newObj,
		});
	};

	useLayoutEffect(() => {
		const fetchUserData = () => {
			api
				.get(`/auth/detail`, {
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

	useEffect(() => {
		findSnsIcon();
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
				<ProfileImage url={userData.imageUrl || DefaultImage} size="big" />
				<UserInfo>
					<UserInfo.Name>{userData.nickname}</UserInfo.Name>
					<UserInfo.Job>
						{jobsMapping[userData.job ? userData.job : 'none']}
					</UserInfo.Job>
					<UserInfo.Description>
						{userData.profile ? userData.profile : defaultUser.profile}
					</UserInfo.Description>
				</UserInfo>
				<ModifyProfileButton
					{...openButtonProps}
					ref={openButtonRef}
					clicked={clicked}
					onClick={handleClick}
					disabled={userData === defaultUser}
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
						<ProfileForm
							type="edit"
							user={userData === defaultUser ? null : userData}
							handleEditButtonClick={handleEditButtonClick}
						/>
						<DialogCloseButton onCloseButton={handleClose} />
					</Dialog>
				</OverlayContainer>
			)}
		</>
	);
};

export default ProfileView;
