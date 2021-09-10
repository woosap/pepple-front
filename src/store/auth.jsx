import React, { createContext, useState } from 'react';

const AuthContext = createContext({
	state: { token: null, config: null },
	actions: {
		setToken: () => {},
		setConfig: () => {},
	},
});

const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [config, setConfig] = useState(null);

	const value = {
		state: { token, config },
		actions: { setToken, setConfig },
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const { Consumer: AuthConsumer } = AuthContext;
export { AuthProvider, AuthConsumer };
export default AuthContext;
