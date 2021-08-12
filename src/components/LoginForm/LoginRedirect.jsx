import React, { useEffect } from 'react';
import qs from 'qs';

const LoginRedirect = ({ location, history }) => {
	useEffect(() => {
		function getToken() {
			const { token } = qs.parse(location.search, {
				ignoreQueryPrefix: true,
			});

			console.log(token);
		}
		getToken();
		history.push('/');
	}, [location]);
	return <div />;
};

export default LoginRedirect;
