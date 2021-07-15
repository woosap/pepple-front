import React, { useState } from 'react';
import {
	ProfileViewStyled,
	UserInfo,
	ModifyProfileButton,
	SNSList,
} from './ProfileView.styles';
import ProfileImage from '../ProfileImage/ProfileImage';

const ProfileView = ({ user }) => {
	const [clicked, setClicked] = useState(false);

	const handleClick = () => {
		setClicked(prev => !prev);
	};

	return (
		<ProfileViewStyled>
			<ProfileImage size="big" />
			<UserInfo>
				<UserInfo.Name>{user.name}</UserInfo.Name>
				<UserInfo.Job>
					{user.job === 'FRONTEND' ? '프론트엔드 개발자' : '기획자'}
				</UserInfo.Job>
				<UserInfo.Description>{user.description}</UserInfo.Description>
			</UserInfo>
			<ModifyProfileButton clicked={clicked} onClick={handleClick}>
				개인정보 수정
			</ModifyProfileButton>
			<SNSList>
				{user.sns.map(item => (
					<SNSList.Item key={item.id} sort={item.sort} href={item.link} />
				))}
			</SNSList>
		</ProfileViewStyled>
	);
};

export default ProfileView;
