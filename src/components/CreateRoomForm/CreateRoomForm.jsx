import React, { useState, useContext } from 'react';
import {
	CreateRoomFormStyled,
	FormHeader,
	FormContainer,
	FormItem,
	SubmitButton,
	DropdownButton,
	DropdownBox,
} from './CreateRoomForm.styles';
import FormCategoryItem from './FormCategoryItem';
import { ReactComponent as SpreadIcon } from '../../assets/icon/icon-arrow-bottom.svg';
import DropdownBoxItem from './DropdownBoxItem';
import useInput from '../../hooks/useInput';
import DefaultContext from '../../store/default';
import RoomContext from '../../store/room';

const CreateRoomForm = () => {
	const { createRoom } = useContext(RoomContext);
	const numberOfMembers = [2, 3, 4, 5];
	const { categoriesObj } = useContext(DefaultContext);
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [clicked, setClicked] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const [capacity, setCapacity] = useState(null);
	const [selectedOption, setSelectedOption] =
		useState('인원 수를 선택해 주세요.');
	const title = useInput('');
	const subtitle = useInput('');
	const categories = Object.keys(categoriesObj);

	const handleSubmitButtonClick = e => {
		e.preventDefault();
		setClicked(prev => !prev);
		createRoom(title.value, subtitle.value, capacity, selectedCategory);
	};

	const handleDropdownButtonClick = () => {
		setIsActive(prev => !prev);
	};

	return (
		<CreateRoomFormStyled>
			<FormHeader>방 새로 만들기</FormHeader>
			<FormContainer>
				<FormItem.Box>
					<FormItem>
						<FormItem.Title>카테고리</FormItem.Title>
						<FormItem.CategoryList>
							{categories.map(value => (
								<FormCategoryItem
									key={categoriesObj[value].id}
									category={categoriesObj[value]}
									selectedCategory={selectedCategory}
									setSelectedCategory={setSelectedCategory}
								/>
							))}
						</FormItem.CategoryList>
					</FormItem>
					<FormItem>
						<FormItem.Title>대제목</FormItem.Title>
						<FormItem.Input
							placeholder="페플러의 관심을 끌 수 있도록 제목을 설정해 주세요!"
							{...title}
						/>
					</FormItem>
					<FormItem>
						<FormItem.Title>소제목</FormItem.Title>
						<FormItem.Input
							placeholder="스터디에 대해 잘 알 수 있게 적어주세요!"
							{...subtitle}
						/>
					</FormItem>
					<FormItem>
						<FormItem.Title>참여 인원</FormItem.Title>
						<FormItem.Select>
							<DropdownButton
								isActive={isActive}
								onClick={handleDropdownButtonClick}
							>
								{selectedOption}
								<span className="spreadIcon">
									<SpreadIcon />
								</span>
							</DropdownButton>
						</FormItem.Select>
						<FormItem.Description>
							최대 다섯명까지 함께할 수 있습니다.
						</FormItem.Description>
						<DropdownBox isActive={isActive}>
							{numberOfMembers.map(number => (
								<DropdownBoxItem
									key={number}
									number={number}
									selectedOption={selectedOption}
									setSelectedOption={setSelectedOption}
									setNumber={setCapacity}
									setIsActive={setIsActive}
								/>
							))}
						</DropdownBox>
					</FormItem>
				</FormItem.Box>
				<SubmitButton clicked={clicked} onClick={handleSubmitButtonClick}>
					완료
				</SubmitButton>
			</FormContainer>
		</CreateRoomFormStyled>
	);
};

export default CreateRoomForm;
