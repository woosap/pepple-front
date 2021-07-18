import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';

const Google = () => {
	const [userId, setUserId] = useState();
	const [userEmail, setUserEmail] = useState('');
	const [provider, setProvider] = useState('google');
	const [accessToken, setAccessToken] = useState('');

	const onSuccess = res => {
		setUserId(res.profileObj.googleId);
		setUserEmail(res.profileObj.email);
		setProvider('google');
		setAccessToken(res.accessToken);
		console.log(userId, userEmail, provider, accessToken);
	};

	const onFailure = error => {
		console.log(error);
	};

	const clientId =
		'1096186356449-s3vdf9v5ajccuso5iepumguosiii2378.apps.googleusercontent.com';

	return (
		<GoogleLogin
			clientId={clientId}
			render={props => (
				<GoogleLoginButton onClick={props.onClick}>Google</GoogleLoginButton>
			)}
			onSuccess={onSuccess}
			onFailure={onFailure}
		/>
	);
};

export default Google;

export const GoogleLoginButton = styled.div`
	width: 100%;
	text-align: center;
`;
