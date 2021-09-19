import React, { createContext, useState } from 'react';
import DefaultImage from '../assets/img-default.svg';

const AuthContext = createContext({
	state: {
		token: null,
		userId: null,
		userImg: DefaultImage,
		isJoinRequired: false,
		isLoginRequired: false,
	},
	actions: {
		setToken: () => {},
		setUserId: () => {},
		setUserImg: () => {},
		setIsJoinRequired: () => {},
		setIsLoginRequired: () => {},
	},
});

const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [userId, setUserId] = useState(localStorage.getItem('user'));
	const [userImg, setUserImg] = useState(DefaultImage);
	const [isJoinRequired, setIsJoinRequired] = useState(false);
	const [isLoginRequired, setIsLoginRequired] = useState(true);

	const value = {
		state: { token, userId, userImg, isJoinRequired, isLoginRequired },
		actions: {
			setToken,
			setUserId,
			setUserImg,
			setIsJoinRequired,
			setIsLoginRequired,
		},
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const { Consumer: AuthConsumer } = AuthContext;
export { AuthProvider, AuthConsumer };
export default AuthContext;
