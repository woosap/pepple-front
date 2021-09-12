import React, { createContext, useState } from 'react';

const AuthContext = createContext({
	state: { token: null, userId: null, userImg: null, isJoinRequired: false },
	actions: {
		setToken: () => {},
		setUserId: () => {},
		setUserImg: () => {},
		setIsJoinRequired: () => {},
	},
});

const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [userId, setUserId] = useState(null);
	const [userImg, setUserImg] = useState(null);
	const [isJoinRequired, setIsJoinRequired] = useState(false);

	const value = {
		state: { token, userId, userImg, isJoinRequired },
		actions: { setToken, setUserId, setUserImg, setIsJoinRequired },
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const { Consumer: AuthConsumer } = AuthContext;
export { AuthProvider, AuthConsumer };
export default AuthContext;
