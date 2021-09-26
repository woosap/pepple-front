import React from 'react';
import ProfileImageStyled from './ProfileImage.styles';
import DefaultImage from '../../assets/img-default.svg';

const ProfileImage = ({ url, size, order, length }) => {
	return (
		<ProfileImageStyled size={size} order={order} length={length}>
			<img src={url || DefaultImage} alt="profile" />
		</ProfileImageStyled>
	);
};

export default ProfileImage;

ProfileImage.defaultProps = {
	url: DefaultImage,
};
