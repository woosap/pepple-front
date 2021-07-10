import React from 'react';
import {
	RoomCloudViewStyled,
	RoomCloudViewHeader,
	UploadButton,
	ContentList,
} from './RoomCloudView.styles';
import { ReactComponent as UploadIcon } from '../../assets/icon/icon-add.svg';
import CloudResource from '../CloudResource/CloudResource';

const RoomCloudView = ({ resources }) => (
	<RoomCloudViewStyled>
		<RoomCloudViewHeader>
			<RoomCloudViewHeader.Title>클라우드</RoomCloudViewHeader.Title>
			<UploadButton>
				<UploadIcon />
			</UploadButton>
		</RoomCloudViewHeader>
		<ContentList>
			{resources.map(res => (
				<CloudResource key={res.id} resource={res} />
			))}
		</ContentList>
	</RoomCloudViewStyled>
);

export default RoomCloudView;
