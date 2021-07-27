import React, { useEffect } from 'react';
import qs from 'qs';
import axios from 'axios';

const LoginRedirect = ({ location, history }) => {
	useEffect(() => {
		async function getToken() {
			const { code } = qs.parse(location.search, {
				ignoreQueryPrefix: true,
			});

			const clientID = 'c626d47b6711b219e86c';
			const clientSecret = 'fde8a70c08f08942b2a82e4ceb5162f74198e647';

			const response = await axios.post(
				'https://github.com/login/oauth/access_token',
				{
					code,
					clientID,
					clientSecret,
				},
				{
					headers: {
						accept: 'application/json',
					},
				},
			);

			const token = response.data.access_token;

			console.log(`github token: ${token}`);
			console.log(location);
		}

		getToken();
		history.push('/');
	}, [location]);
	return <div />;
};

export default LoginRedirect;
