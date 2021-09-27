import AgoraRTC from 'agora-rtc-sdk-ng';

const useAgora = (userId, roomId) => {
	const rtc = {
		client: null,
		localAudioTrack: null,
	};

	const options = {
		appId: process.env.REACT_APP_AGORA_APP_ID,
		channel: roomId,
		token: null,
		uid: userId,
	};

	// get agora token
	const getAgoraToken = () => {
		options.token = null;
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
	const joinChannel = async () => {
		try {
			rtc.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' });
			rtc.client.on('user-published', handleUserPublished);
			rtc.client.on('user-unpublished', handleUserUnpublished);
			rtc.client.join(
				options.appId,
				options.channel,
				options.token,
				options.uid,
			);
			rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
		} catch (err) {
			console.log(err);
		}
	};

	// leave room
	const leaveChannel = async () => {
		rtc.localAudioTrack.close();
		await rtc.client.leave();
	};

	const mute = () => {
		rtc.localAudioTrack.setEnabled(false);
	};

	const unmute = () => {
		rtc.localAudioTrack.setEnabled(true);
	};

	return { getAgoraToken, joinChannel, leaveChannel, mute, unmute };
};

export default useAgora;
