import React, { useState } from 'react';
import {
	CloudResourceStyled,
	CloudResourceWrapper,
	UploadInfo,
	DownloadButton,
	RemoveButton,
} from './CloudResource.styles';
import { ReactComponent as DownloadIcon } from '../../assets/icon/icon-clipboard.svg';
import { ReactComponent as RemoveIcon } from '../../assets/icon/icon-remove.svg';

const CloudResource = ({ resource }) => {
	const [clicked, setClicked] = useState(false);

	const handleClick = () => {
		setClicked(prev => !prev);
	};

	return (
		<CloudResourceStyled clicked={clicked} onClick={handleClick}>
			<CloudResourceWrapper>
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
			</CloudResourceWrapper>
			<RemoveButton className="removeButton">
				<RemoveIcon />
			</RemoveButton>
		</CloudResourceStyled>
	);
};

export default CloudResource;
