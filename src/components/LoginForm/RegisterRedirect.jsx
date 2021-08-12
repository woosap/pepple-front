import React, { useEffect } from 'react';
import qs from 'qs';

const RegisterRedirect = ({ location, history }) => {
	useEffect(() => {
		function getUserInfo() {
			const { id, image } = qs.parse(location.search, {
				ignoreQueryPrefix: true,
			});

			console.log(id);
			console.log(image);
		}
		getUserInfo();
		history.push('/');
	}, [location]);
	return <div />;
};

export default RegisterRedirect;
