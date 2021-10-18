/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import api from '../api';

const useAgora = () => {
	AgoraRTC.setLogLevel(3);
	const rtc = {
		client: AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' }),
	};

	const options = {
		appId: process.env.REACT_APP_AGORA_APP_ID,
		channel: '',
	};

	const [remoteUsers, setRemoteUsers] = useState({});

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
		setRemoteUsers(prevState => {
			const newState = { ...prevState, [user.uid]: 'unmute' };
			return newState;
		});
	};

	const handleUserUnpublished = async user => {
		await rtc.client.unsubscribe(user);
		setRemoteUsers(prevState => {
			const newState = { ...prevState, [user.uid]: 'mute' };
			return newState;
		});
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
				setRemoteUsers(prevState => {
					const newState = { ...prevState, [userId]: 'unmute' };
					return newState;
				});
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
		setRemoteUsers({});
		console.log('leave success !');
	};

	const muteTrack = (userId, localAudioTrack) => {
		localAudioTrack?.setMuted(true);
		setRemoteUsers(prevState => {
			const newState = { ...prevState, [userId]: 'mute' };
			return newState;
		});
	};

	const unmuteTrack = (userId, localAudioTrack) => {
		localAudioTrack?.setMuted(false);
		setRemoteUsers(prevState => {
			const newState = { ...prevState, [userId]: 'unmute' };
			return newState;
		});
	};

	return { joinChannel, leaveChannel, muteTrack, unmuteTrack, remoteUsers };
};

export default useAgora;
