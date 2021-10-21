import { useState } from 'react';
import AWS from 'aws-sdk';
import nextId from 'react-id-generator';

const useCloud = roomId => {
	const [fileName, setFileName] = useState('');
	const [fileObj, setFileObj] = useState(null);
	const [url, setUrl] = useState('');

	const handleFileChange = e => {
		setFileName(e.target.files[0].name);
		setFileObj(e.target.files[0]);
	};

	const handleUrlChange = e => {
		setUrl(e.target.value);
	};

	const handleFileUpload = () => {
		const s3 = new AWS.S3();
		const prefix = `${roomId}/`;
		const params = {
			Body: fileObj,
			Bucket: 'pepple-profileimg',
			Key: `${prefix}${nextId()}.${fileObj.type.split('/')[1]}`,
		};
		s3.putObject(params, (err, data) => {
			if (err) console.log(err);
			else console.log(data);
		});
	};

	const handleUrlUpload = () => {};

	return {
		fileName,
		url,
		handleFileChange,
		handleUrlChange,
		handleFileUpload,
		handleUrlUpload,
	};
};

export default useCloud;
