/* eslint-disable no-underscore-dangle */
import AgoraRTC from 'agora-rtc-sdk-ng';
import useSWR from 'swr';
import api from '../api';

let users = {};
const useRemoteUsers = () => {
	const { data, mutate } = useSWR('remoteUsers', () => users);
	return {
		data,
		mutate: (id, audioState) => {
			const newUsers = { ...users, [id]: audioState };
			users = newUsers;
			return mutate();
		},
	};
};

const useAgora = () => {
	AgoraRTC.setLogLevel(3);
	const rtc = {
		client: AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' }),
	};
	const options = {
		appId: process.env.REACT_APP_AGORA_APP_ID,
		channel: '',
	};
	const { data, mutate } = useRemoteUsers();

	const getAgoraToken = async (userId, roomId) => {
		const token = localStorage.getItem('token');
		options.channel = String(roomId);
		try {
			const res = await api.post(
				`/agoraToken`,
				{
					channelName: options.channel,
					userAccount: userId,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			return res.data.token;
		} catch (err) {
			console.log(err);
			return null;
		}
	};

	const handleUserPublished = async (user, mediaType) => {
		await rtc.client.subscribe(user, mediaType);
		await user.audioTrack.play();
		mutate(user.uid, 'unmute');
	};

	const handleUserUnpublished = async user => {
		await rtc.client.unsubscribe(user);
		mutate(user.uid, 'mute');
	};

	const joinChannel = async (userId, roomId) => {
		try {
			const agoraToken = await getAgoraToken(userId, roomId);
			rtc.client.on('user-published', handleUserPublished);
			rtc.client.on('user-unpublished', handleUserUnpublished);
			if (agoraToken) {
				await rtc.client
					.join(options.appId, options.channel, agoraToken, userId)
					.then(res => console.log('join success !', res))
					.catch(err => console.log(err));
				const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
				await rtc.client.publish([localAudioTrack]);
				mutate(userId, 'unmute');
				console.log('publish success!');
				return localAudioTrack;
			}
			console.log('agora token missing');
			return null;
		} catch (err) {
			console.log(err);
			return null;
		}
	};

	const leaveChannel = async localAudioTrack => {
		await localAudioTrack?.setEnabled(true);
		await localAudioTrack?.stop();
		await localAudioTrack?.close();
		await rtc?.client?.leave();
		console.log('leave success !');
	};

	const muteTrack = (userId, localAudioTrack) => {
		localAudioTrack?.setMuted(true);
		mutate(userId, 'mute');
	};

	const unmuteTrack = (userId, localAudioTrack) => {
		localAudioTrack?.setMuted(false);
		mutate(userId, 'unmute');
	};

	return {
		joinChannel,
		leaveChannel,
		muteTrack,
		unmuteTrack,
		tracks: data,
	};
};

export default useAgora;
