import React, { useState } from 'react';
import styled from 'styled-components';

const FormCategoryItem = ({
	category,
	selectedCategory,
	setSelectedCategory,
}) => {
	const [selected, setSelected] = useState(false);

	const handleClick = () => {
		if (!selected) {
			setSelectedCategory([...selectedCategory, category.value]);
		} else {
			setSelectedCategory(
				selectedCategory.filter(item => item !== category.value),
			);
		}
		setSelected(prev => !prev);
	};

	return (
		<FormCategoryItemStyled selected={selected} onClick={handleClick}>
			{category.title}
		</FormCategoryItemStyled>
	);
};

export default FormCategoryItem;

const FormCategoryItemStyled = styled.div`
	width: 50px;
	height: 19px;
	background: #ffffff;
	border: 1px solid ${({ selected }) => (selected ? '#6138B9' : '#B9B9B9')};
	box-sizing: border-box;
	border-radius: 50px;
	margin-right: 8px;
	font-family: Apple SD Gothic Neo;
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 19px;
	text-align: center;
	color: ${({ selected }) => (selected ? '#6138B9' : '#B9B9B9')};
	cursor: pointer;
	:hover {
		color: ${({ selected }) => (selected ? '#6138B9' : '#cbcfff')};
		border: 1px solid ${({ selected }) => (selected ? '#6138B9' : '#cbcfff')};
	}
`;
