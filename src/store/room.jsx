import React, { createContext, useState, useLayoutEffect } from 'react';
import api from '../api';

const RoomContext = createContext({
	rooms: [],
	createRoom: () => {},
	enterRoom: () => {},
	getTime: () => {},
});

const RoomProvider = ({ children }) => {
	const [rooms, setRooms] = useState([]);

	const getRooms = () => {
		api
			.get(`/room?pageNumber=${0}&pageSize=${10}`)
			.then(res => {
				setRooms([...res.data]);
			})
			.catch(err => console.log(err));
	};

	const enterRoom = roomId => {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('user');
		api
			.post(
				`/room/enter`,
				{
					roomId,
					userId,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};

	const createRoom = (title, subTitle, capacity, category) => {
		const token = localStorage.getItem('token');
		api
			.post(
				`/room/create`,
				{
					capacity,
					category,
					subTitle,
					title,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then(res => {
				console.log(res);
				getRooms();
			})
			.catch(err => console.log(err));
	};

	const getRoomDetail = roomId => {
		api
			.get(`/room/${roomId}`)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};

	const getTime = room => {
		const now = new Date();
		const birth = new Date(room.date);

		const timeMinutes = Math.floor(
			(now.getTime() - birth.getTime()) / 1000 / 60,
		);
		if (timeMinutes < 1) return '방금전';
		if (timeMinutes < 60) return `${timeMinutes}분전`;

		const timeHours = Math.floor(timeMinutes / 60);
		if (timeHours < 24) return `${timeHours}시간 전`;

		const timeDays = Math.floor(timeMinutes / 60 / 24);
		if (timeDays < 365) return `${timeDays}일전`;

		return `${Math.floor(timeDays / 365)}년 전`;
	};

	useLayoutEffect(() => {
		getRooms();
	}, []);

	const value = {
		rooms,
		createRoom,
		enterRoom,
		getTime,
		getRoomDetail,
	};

	return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

const { Consumer: RoomConsumer } = RoomContext;
export { RoomProvider, RoomConsumer };
export default RoomContext;
