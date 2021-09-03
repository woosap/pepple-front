import React, { useState } from 'react';
import { OverlayContainer } from '@react-aria/overlays';
import Dialog from '../Dialog/Dialog';
import ModifyProfileForm from './ModifyProfileForm';
import {
	ProfileViewStyled,
	UserInfo,
	ModifyProfileButton,
	SNSList,
} from './ProfileView.styles';
import ProfileImage from '../ProfileImage/ProfileImage';
import DialogCloseButton from '../Dialog/DialogCloseButton';
import useToggleDialog from '../../hooks/useToggleDialog';

const ProfileView = ({ user }) => {
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
				<ProfileImage size="big" />
				<UserInfo>
					<UserInfo.Name>{user.name}</UserInfo.Name>
					<UserInfo.Job>
						{user.job === 'FRONTEND' ? '프론트엔드 개발자' : '기획자'}
					</UserInfo.Job>
					<UserInfo.Description>{user.description}</UserInfo.Description>
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
					{user.sns.map(item => (
						<SNSList.Item key={item.id} sort={item.sort} href={item.link} />
					))}
				</SNSList>
			</ProfileViewStyled>
			{state.isOpen && (
				<OverlayContainer>
					<Dialog onClose={handleClose}>
						<ModifyProfileForm />
						<DialogCloseButton onCloseButton={handleClose} />
					</Dialog>
				</OverlayContainer>
			)}
		</>
	);
};

export default ProfileView;
