import React from 'react';
import {
	CloudResourceStyled,
	UploadInfo,
	DownloadButton,
} from './CloudResource.styles';
import { ReactComponent as DownloadIcon } from '../../assets/icon/icon-clipboard.svg';

const CloudResource = ({ resource }) => {
	return (
		<CloudResourceStyled>
			<UploadInfo>
				<UploadInfo.Path>{resource.path}</UploadInfo.Path>
				<UploadInfo.Uploader>{resource.uploader}</UploadInfo.Uploader>
				<UploadInfo.UploadedTime>
					{resource.uploadedTime}
				</UploadInfo.UploadedTime>
			</UploadInfo>
			<DownloadButton>
				<DownloadIcon />
			</DownloadButton>
		</CloudResourceStyled>
	);
};

export default CloudResource;
