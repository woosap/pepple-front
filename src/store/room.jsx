import React, { createContext } from 'react';

const RoomContext = createContext({});

const RoomProvider = ({ children }) => {
	const value = {};

	return (
		<RoomContext.RoomProvider value={value}>
			{children}
		</RoomContext.RoomProvider>
	);
};

const { Consumer: RoomConsumer } = RoomContext;
export { RoomProvider, RoomConsumer };
export default RoomContext;
