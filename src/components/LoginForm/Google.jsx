import React from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';

const Google = () => {
	const onSuccess = res => {
		console.log(res);
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
