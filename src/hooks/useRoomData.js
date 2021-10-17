import useSWR from 'swr';
import api from '../api';

export const useRoomData = roomId => {
	const token = localStorage.getItem('token');
	const getRoomData = useSWR(
		['getRoomData', roomId],
		() =>
			api
				.get(`/room/${roomId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(res => res.data)
				.catch(err => console.log(err)),
		{
			refreshInterval: 2000,
		},
	);

	return { getRoomData };
};

export const useRoomListData = () => {
	const getRoomListData = useSWR(
		'getRoomListData',
		() =>
			api
				.get(`/room?pageNumber=${0}&pageSize=${10}`)
				.then(res => res.data)
				.catch(err => console.log(err)),
		{
			refreshInterval: 2000,
		},
	);

	return { getRoomListData };
};
