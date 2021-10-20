import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';
import useAgora from '../hooks/useAgora';
import { useRoomListData } from '../hooks/useRoomData';

const RoomContext = createContext({
	rooms: [],
	users: null,
	roomInfo: null,
	error: false,
	createRoom: () => {},
	enterRoom: () => {},
	leaveRoom: () => {},
	getTime: () => {},
	getRooms: () => {},
	getRoomDetail: () => {},
});

const RoomProvider = ({ children }) => {
	const history = useHistory();
	const [users, setUsers] = useState(null);
	const [roomInfo, setRoomInfo] = useState(null);
	const [error, setError] = useState(false);
	const [mute, setMute] = useState(false);
	const [localAudioTrack, setLocalAudioTrack] = useState(null);
	const { joinChannel, leaveChannel, muteTrack, unmuteTrack } = useAgora();
	const { getRoomListData } = useRoomListData();

	const checkRoomUsers = async (roomId, userId) => {
		const token = localStorage.getItem('token');
		try {
			const res = await api.get(`/room/${roomId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return !res.data.users.some(user => user.userId === userId);
		} catch (err) {
			console.log(err);
			return false;
		}
	};

	const enterRoom = async roomId => {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('user');
		const result = await checkRoomUsers(roomId, userId);
		if (!result) {
			history.push(`/room/${roomId}`);
			return;
		}
		await api
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
			.then(res => {
				console.log(res);
				// getRoomData.mutate();
				history.push(`/room/${roomId}`);
				const agora = async () => {
					const track = await joinChannel(userId, roomId);
					setLocalAudioTrack(track);
				};
				agora();
			})
			.catch(err => {
				console.log(err);
				setError(true);
			});
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
				getRoomListData.mutate();
				enterRoom(res.data.roomId);
				history.push(`/room/${res.data.roomId}`);
			})
			.catch(err => console.log(err));
	};

	const leaveRoom = roomId => {
		const userId = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		api
			.post(
				`/room/leave`,
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
			.then(res => {
				console.log(res);
				leaveChannel(localAudioTrack);
				history.replace('/');
				getRoomListData.mutate();
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

	const handleMute = () => {
		const userId = localStorage.getItem('user');
		if (mute) unmuteTrack(userId, localAudioTrack);
		else muteTrack(userId, localAudioTrack);
		setMute(!mute);
	};

	const value = {
		roomInfo,
		users,
		error,
		mute,
		setRoomInfo,
		setUsers,
		setError,
		setLocalAudioTrack,
		createRoom,
		enterRoom,
		leaveRoom,
		getTime,
		handleMute,
	};

	return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

const { Consumer: RoomConsumer } = RoomContext;
export { RoomProvider, RoomConsumer };
export default RoomContext;
