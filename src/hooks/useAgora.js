import AgoraRTC from 'agora-rtc-sdk-ng';
import api from '../api';

const useAgora = () => {
	const rtc = {
		client: AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' }),
		localAudioTrack: null,
	};

	const options = {
		appId: process.env.REACT_APP_AGORA_APP_ID,
		channel: '',
		uid: '',
	};

	// get agora token
	const getAgoraToken = async (userId, roomId) => {
		const token = localStorage.getItem('token');
		options.channel = String(roomId);
		options.uid = userId;
		try {
			const res = await api.post(
				`/agoraToken`,
				{
					channelName: options.channel,
					userAccount: options.uid,
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

	// remote user published
	const handleUserPublished = async (user, mediaType) => {
		await rtc.client.subscribe(user, mediaType);
		if (mediaType === 'audio') {
			user.audioTrack.play();
		}
	};

	// remote user unpublished
	const handleUserUnpublished = async user => {
		await rtc.client.unsubscribe(user);
	};

	// enter room
	const joinChannel = async (userId, roomId) => {
		try {
			const agoraToken = await getAgoraToken(userId, roomId);
			rtc.client.on('user-published', handleUserPublished);
			rtc.client.on('user-unpublished', handleUserUnpublished);
			if (agoraToken) {
				await rtc.client
					.join(options.appId, options.channel, agoraToken, options.uid)
					.then(res => console.log('join success !', res))
					.catch(err => console.log(err));
				rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
				await rtc.client.publish([rtc.localAudioTrack]);
				console.log('publish success!');
			} else {
				console.log('agora token missing');
			}
		} catch (err) {
			console.log(err);
		}
	};

	// leave room
	const leaveChannel = async () => {
		console.log(rtc);
		if (rtc.localAudioTrack) {
			await rtc.localAudioTrack.close();
		}
		if (rtc.client) {
			await rtc.client.leave();
		}
	};

	const mute = () => {
		rtc.localAudioTrack.setEnabled(false);
	};

	const unmute = () => {
		rtc.localAudioTrack.setEnabled(true);
	};

	return { joinChannel, leaveChannel, mute, unmute };
};

export default useAgora;
