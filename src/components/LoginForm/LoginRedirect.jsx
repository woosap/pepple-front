import React, { useContext, useLayoutEffect } from 'react';
import qs from 'qs';
import AuthContext from '../../store/auth';

const LoginRedirect = ({ history }) => {
	const { state, actions } = useContext(AuthContext);
	const { userId } = state;
	const {
		setToken,
		setUserId,
		setUserImg,
		setIsJoinRequired,
		setIsLoginRequired,
	} = actions;

	const getUserInfo = query => {
		const getId = query.id;
		const getImage = query.image;
		if (getId) {
			setUserId(getId);
			if (getImage) setUserImg(getImage);
			setIsJoinRequired(true);
			history.push('/');
		} else {
			console.warn('로그인 중 에러 발생 : user id 받아오기 실패');
		}
	};

	useLayoutEffect(() => {
		const query = qs.parse(window.location.search, {
			ignoreQueryPrefix: true,
		});
		const getToken = query.token;
		if (getToken && userId) {
			localStorage.setItem('token', getToken);
			setToken(getToken);
			setIsLoginRequired(false);
			history.push('/');
		} else if (getToken && !userId) {
			console.warn('로그인 중 에러 발생 : register 전 토큰 발급');
		} else {
			getUserInfo(query);
			setIsLoginRequired(false);
		}
	}, []);

	return <div />;
};

export default LoginRedirect;
