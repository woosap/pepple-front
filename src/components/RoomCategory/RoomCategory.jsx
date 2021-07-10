import React from 'react';
import RoomCategoryStyled from './RoomCategory.styles';

const RoomCategory = ({ category }) => (
	<RoomCategoryStyled category={category}>{category}</RoomCategoryStyled>
);

export default RoomCategory;
