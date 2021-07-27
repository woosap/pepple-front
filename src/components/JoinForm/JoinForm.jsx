import React from 'react';
import {
	JoinFormStyled,
	JoinFormBox,
	FormContainer,
	FormItem,
} from './JoinForm.styles';

const JoinForm = () => {
	return (
		<JoinFormStyled>
			<JoinFormBox>
				<JoinFormBox.Title>추가 정보 입력하기</JoinFormBox.Title>
				<FormContainer>
					<FormItem>
						<FormItem.Title>이메일</FormItem.Title>
						<FormItem.Input />
					</FormItem>
					<FormItem>
						<FormItem.Title>프로필 사진</FormItem.Title>
						<FormItem.Input placeholder="400 x 400 사이즈를 권장합니다" />
					</FormItem>
					<FormItem>
						<FormItem.Title>닉네임</FormItem.Title>
						<FormItem.Input placeholder="총 여섯글자까지 가능합니다 (띄어쓰기 제외)" />
					</FormItem>
					<FormItem>
						<FormItem.Title>타이틀</FormItem.Title>
						<FormItem.Input placeholder="나를 나타내는 타이틀을 선택해주세요." />
					</FormItem>
					<FormItem>
						<FormItem.Title>프로필 작성</FormItem.Title>
						<FormItem.TextArea placeholder="프로필을 자유롭게 작성해주세요." />
					</FormItem>
					<FormItem>
						<FormItem.Title>SNS 연결하기</FormItem.Title>
						<FormItem.InputList>
							<FormItem.InputItem placeholder="URL을 입력해주세요." />
							<FormItem.InputItem placeholder="URL을 입력해주세요." />
							<FormItem.InputItem placeholder="URL을 입력해주세요." />
							<FormItem.InputItem placeholder="URL을 입력해주세요." />
						</FormItem.InputList>
					</FormItem>
				</FormContainer>
				<JoinFormBox.SubmitButton>프로필 설정 완료</JoinFormBox.SubmitButton>
				<JoinFormBox.SkipButton>다음에 입력하기</JoinFormBox.SkipButton>
			</JoinFormBox>
		</JoinFormStyled>
	);
};

export default JoinForm;
