import React from 'react';
import ProfileImageStyled from './ProfileImage.styles';
import defaultImg from '../../assets/img-default.svg';

const ProfileImage = ({ url, size, order }) => (
	<ProfileImageStyled size={size} order={order}>
		{!url && <img src={defaultImg} alt="profile" />}
		{url && <img src={url} alt="profile" />}
	</ProfileImageStyled>
);

export default ProfileImage;
