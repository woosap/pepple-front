import React from 'react';
import ProfileImageStyled from './ProfileImage.styles';
import DefaultImage from '../../assets/img-default.svg';

const ProfileImage = ({ url, size, order }) => (
	<ProfileImageStyled size={size} order={order}>
		{url && <img src={url} alt="profile" />}
	</ProfileImageStyled>
);

export default ProfileImage;

ProfileImage.defaultProps = {
	url: DefaultImage,
};
