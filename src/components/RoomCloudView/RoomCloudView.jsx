import React, { useState } from 'react';
import {
	RoomCloudViewStyled,
	RoomCloudViewHeader,
	UploadButton,
	ContentList,
} from './RoomCloudView.styles';
import { ReactComponent as UploadIcon } from '../../assets/icon/icon-add.svg';
import CloudResource from '../CloudResource/CloudResource';
import UploadResourceForm from '../UploadResourceForm/UploadResourceForm';

const RoomCloudView = ({ resources }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleUploadButtonClick = () => {
		setIsOpen(!isOpen);
	};
	return (
		<RoomCloudViewStyled>
			<RoomCloudViewHeader>
				<RoomCloudViewHeader.Title>클라우드</RoomCloudViewHeader.Title>
				<UploadButton onClick={handleUploadButtonClick}>
					<UploadIcon />
				</UploadButton>
			</RoomCloudViewHeader>
			{isOpen && <UploadResourceForm />}
			<ContentList>
				{resources.map(res => (
					<CloudResource key={res.id} resource={res} />
				))}
			</ContentList>
		</RoomCloudViewStyled>
	);
};

export default RoomCloudView;
