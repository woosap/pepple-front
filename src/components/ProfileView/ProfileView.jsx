import React from 'react';
import {
	ProfileViewStyled,
	ProfileImage,
	UserInfo,
	ModifyProfileButton,
	SNSList,
} from './ProfileView.styles';

const ProfileView = ({ user }) => {
	return (
		<ProfileViewStyled>
			<ProfileImage />
			<UserInfo>
				<UserInfo.Name>{user.name}</UserInfo.Name>
				<UserInfo.Job>{user.job}</UserInfo.Job>
				<UserInfo.Description>{user.description}</UserInfo.Description>
			</UserInfo>
			<ModifyProfileButton>개인정보 수정</ModifyProfileButton>
			<SNSList>
				{user.sns.map(item => (
					<SNSList.Item key={item.id} sort={item.sort} href={item.link} />
				))}
			</SNSList>
		</ProfileViewStyled>
	);
};

export default ProfileView;
