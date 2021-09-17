import React from 'react';
import {
	RoomProfileViewStyled,
	RoomTitle,
	RoomInfo,
} from './RoomProfileView.styles';

const RoomProfileView = () => (
	<RoomProfileViewStyled>
		<RoomTitle />
		<RoomInfo>
			<RoomInfo.CategoryList />
			<RoomInfo.BirthTime />
		</RoomInfo>
	</RoomProfileViewStyled>
);

export default RoomProfileView;
