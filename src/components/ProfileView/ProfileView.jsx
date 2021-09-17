import React, { useContext, useEffect, useState } from 'react';
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

const ProfileView = ({ user }) => {
	const authContext = useContext(AuthContext);
	const { token } = authContext.state;
	const { state, openButtonProps, openButtonRef } = useToggleDialog();
	const [clicked, setClicked] = useState(false);
	const [userData, setUserData] = useState(user);

	useEffect(async () => {
		await axios
			.get(`http://3.36.118.216:8080/auth/detail`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				setUserData(res.data);
			})
			.catch(err => {
				console.log(err);
				setUserData(user);
			});
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
					<UserInfo.Job>{userData.job}</UserInfo.Job>
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

ProfileView.defaultProps = {
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
};
