import React, { createContext } from 'react';

const AgoraContext = createContext({});

const AgoraProvider = ({ children }) => {
	const value = {};
	return (
		<AgoraContext.Provider value={value}>{children}</AgoraContext.Provider>
	);
};

const { Consumer: AgoraConsumer } = AgoraContext;
export { AgoraProvider, AgoraConsumer };
export default AgoraContext;
