import React, { useContext, useState } from 'react';
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

const ProfileView = ({ handleEditButtonClick }) => {
	const { userData, userSns } = useContext(AuthContext).state;
	const { defaultUser, jobsMapping } = useContext(DefaultContext);
	const { state, openButtonProps, openButtonRef } = useToggleDialog();
	const [clicked, setClicked] = useState(false);

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
				{userData === defaultUser ? (
					<ModifyProfileButton disabled>개인정보 수정</ModifyProfileButton>
				) : (
					<ModifyProfileButton
						{...openButtonProps}
						ref={openButtonRef}
						clicked={clicked}
						onClick={handleClick}
					>
						개인정보 수정
					</ModifyProfileButton>
				)}
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
