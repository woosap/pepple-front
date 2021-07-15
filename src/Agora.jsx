import React from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const Agora = () => {
	const rtc = {
		client: null,
		localAudioTrack: null,
	};

	const options = {
		appId: '11bb8939cacb4ec493c2f75300e832b8',
		channel: 'basic',
		token:
			'00611bb8939cacb4ec493c2f75300e832b8IAB1goEn1xsZMPnjeJ2gLfJIqlg2QqSDhvixaoGf326di1N1eZAAAAAAEADQXSp/vVfwYAEAAQC9V/Bg',
	};

	async function startBasicCall() {
		rtc.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
		const uid = await rtc.client.join(
			options.appId,
			options.channel,
			options.token,
			null,
		);
		console.log(uid);
		rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
		await rtc.client.publish([rtc.localAudioTrack]);

		rtc.client.on('user-published', async (user, mediaType) => {
			await rtc.client.subscribe(user, mediaType);

			if (mediaType === 'audio') {
				const remoteAudioTrack = user.audioTrack;
				remoteAudioTrack.play();
			}
		});

		rtc.client.on('user-unpublished', user => {
			const playerContainer = document.getElementById(user.uid);
			playerContainer.remove();
		});
	}

	async function leaveCall() {
		rtc.localAudioTrack.close();
		await rtc.client.leave();
	}

	return (
		<div>
			<button type="button" onClick={startBasicCall}>
				start call
			</button>
			<button type="button" onClick={leaveCall}>
				leave call
			</button>
		</div>
	);
};

export default Agora;
