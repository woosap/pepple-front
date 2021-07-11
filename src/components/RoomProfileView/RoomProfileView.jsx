import React from 'react';
import {
	RoomProfileViewStyled,
	RoomTitle,
	RoomInfo,
} from './RoomProfileView.styles';
import RoomCategory from '../RoomCategory/RoomCategory';

const RoomProfileView = ({ categories }) => (
	<RoomProfileViewStyled>
		<RoomTitle>여기는 방 제목을 입력해주세요. </RoomTitle>
		<RoomInfo>
			<RoomInfo.CategoryList>
				<RoomCategory category="DEVELOPMENT" categories={categories} />
				<RoomCategory category="DEVELOPMENT" categories={categories} />
			</RoomInfo.CategoryList>
			<RoomInfo.BirthTime>17시간 전</RoomInfo.BirthTime>
		</RoomInfo>
	</RoomProfileViewStyled>
);

export default RoomProfileView;
