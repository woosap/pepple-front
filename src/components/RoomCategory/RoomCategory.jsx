import React from 'react';
import RoomCategoryStyled from './RoomCategory.styles';

const RoomCategory = ({ category, categories }) => {
	return (
		<RoomCategoryStyled category={category}>
			{categories[category].ko}
		</RoomCategoryStyled>
	);
};

export default RoomCategory;
