import React, { useContext, useLayoutEffect } from 'react';
import qs from 'qs';
import AuthContext from '../../store/auth';

const LoginRedirect = ({ history }) => {
	const { actions } = useContext(AuthContext);
	const { setToken, setConfig } = actions;

	useLayoutEffect(() => {
		const query = qs.parse(window.location.search, {
			ignoreQueryPrefix: true,
		});
		const getToken = query.token;
		if (getToken) {
			localStorage.setItem('token', getToken);
			setToken(getToken);
			setConfig({
				header: {
					Authorization: `Bearer ${getToken}`,
				},
			});
			history.push('/');
		}
	}, []);
	return <div />;
};

export default LoginRedirect;
