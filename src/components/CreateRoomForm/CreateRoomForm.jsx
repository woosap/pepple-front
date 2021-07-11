import React from 'react';
import {
	CreateRoomFormStyled,
	FormHeader,
	FormContainer,
	FormItem,
	SubmitButton,
} from './CreateRoomForm.styles';
import FormCategoryItem from './FormCategoryItem';
import { ReactComponent as SpreadIcon } from '../../assets/icon/icon-arrow-bottom.svg';

const CreateRoomForm = () => {
	const categories = [
		{
			id: 1,
			eg: 'DESIGN',
			ko: '디자인',
		},
		{
			id: 2,
			eg: 'DEVELOPMENT',
			ko: '개발',
		},
		{
			id: 3,
			eg: 'PROJECT',
			ko: '프로젝트',
		},
		{
			id: 4,
			eg: 'STUDY',
			ko: '스터디',
		},
	];

	return (
		<CreateRoomFormStyled>
			<FormHeader>방 새로 만들기</FormHeader>
			<FormContainer>
				<FormItem.Box>
					<FormItem>
						<FormItem.Title>카테고리</FormItem.Title>
						<FormItem.CategoryList>
							{categories.map(category => (
								<FormCategoryItem key={category.id} category={category} />
							))}
						</FormItem.CategoryList>
					</FormItem>
					<FormItem>
						<FormItem.Title>대제목</FormItem.Title>
						<FormItem.Input placeholder="페플러의 관심을 끌 수 있도록 제목을 설정해 주세요!" />
					</FormItem>
					<FormItem>
						<FormItem.Title>소제목</FormItem.Title>
						<FormItem.Input placeholder="스터디에 대해 잘 알 수 있게 적어주세요!" />
					</FormItem>
					<FormItem>
						<FormItem.Title>참여 인원</FormItem.Title>
						<FormItem.Select>
							<option>인원 수를 선택해 주세요.</option>
							<option>1:1</option>
							<option>2명</option>
							<option>3명</option>
							<option>4명</option>
							<option>5명</option>
						</FormItem.Select>
						<span className="spreadIcon">
							<SpreadIcon />
						</span>
					</FormItem>
				</FormItem.Box>
				<SubmitButton>완료</SubmitButton>
			</FormContainer>
		</CreateRoomFormStyled>
	);
};

export default CreateRoomForm;
