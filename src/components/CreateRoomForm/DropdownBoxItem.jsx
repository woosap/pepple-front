import React from 'react';
import styled from 'styled-components';

const DropdownBoxItem = ({
	number,
	selectedOption,
	setSelectedOption,
	setNumber,
	setIsActive,
}) => {
	const handleClick = e => {
		setNumber(number);
		setSelectedOption(e.target.innerHTML);
		setIsActive(false);
	};
	return (
		<DropdownBoxItemStyled
			selected={selectedOption === `${number}명`}
			onClick={handleClick}
		>
			{number}명
		</DropdownBoxItemStyled>
	);
};

export default DropdownBoxItem;

const DropdownBoxItemStyled = styled.div`
	display: flex;
	align-items: center;
	height: 20px;
	padding-left: 12px;
	box-sizing: border-box;
	background: ${({ selected }) =>
		selected ? 'rgba(241, 241, 241, 0.3)' : 'rgba(255, 255, 255, 0.5)'};
	font-family: Noto Sans KR;
	font-size: 8px;
	font-weight: ${({ selected }) => (selected ? '700' : '100')};
	color: ${({ selected }) => (selected ? '#6138B9' : '#757373')};
	cursor: pointer;

	:hover {
		background: rgba(235, 235, 235, 0.5);
	}
`;
