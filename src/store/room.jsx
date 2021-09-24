import React, { createContext, useState } from 'react';
import api from '../api';

const RoomContext = createContext({
	rooms: [],
	users: null,
	roomInfo: null,
	createRoom: () => {},
	enterRoom: () => {},
	getTime: () => {},
	getRooms: () => {},
	getRoomDetail: () => {},
});

const RoomProvider = ({ children }) => {
	const [rooms, setRooms] = useState([]);
	const [users, setUsers] = useState(null);
	const [roomInfo, setRoomInfo] = useState(null);

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
		const token = localStorage.getItem('token');
		api
			.get(`/room/${roomId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				setRoomInfo(res.data.roomInfo);
				console.log(res.data.users);
				setUsers(res.data.users);
			})
			.catch(err => console.log(err));
	};

	const getTime = room => {
		const now = new Date();
		const birth = new Date(room.date);

		const timeMinutes = Math.floor(
			(now.getTime() - birth.getTime()) / 1000 / 60,
		);
		const timeHours = Math.floor(timeMinutes / 60);
		const timeDays = Math.floor(timeMinutes / 60 / 24);

		if (timeMinutes < 1) return '방금전';
		if (timeMinutes < 60) return `${timeMinutes}분전`;
		if (timeHours < 24) return `${timeHours}시간 전`;
		if (timeDays < 365) return `${timeDays}일전`;
		return `${Math.floor(timeDays / 365)}년 전`;
	};

	const value = {
		rooms,
		roomInfo,
		users,
		setRoomInfo,
		createRoom,
		enterRoom,
		getTime,
		getRooms,
		getRoomDetail,
	};

	return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

const { Consumer: RoomConsumer } = RoomContext;
export { RoomProvider, RoomConsumer };
export default RoomContext;
