import React, { useState } from 'react';
import {
	JoinFormStyled,
	JoinFormBox,
	FormContainer,
	FormItem,
	DropdownBox,
	DropdownItem,
	UploadForm,
} from './JoinForm.styles';
import useInput from '../../hooks/useInput';
import { ReactComponent as SpreadIcon } from '../../assets/icon/icon-arrow-bottom2.svg';

const JoinForm = ({ handleJoinButtonClick }) => {
	const email = useInput('');
	const nickname = useInput('');
	const description = useInput('');
	const jobs = [
		{ id: 1, title: '기획자' },
		{ id: 2, title: 'GUI 디자이너' },
		{ id: 3, title: 'UX 디자이너' },
		{ id: 4, title: '프로덕트 디자이너' },
		{ id: 5, title: '프론트엔드 개발자' },
		{ id: 6, title: '백엔드 개발자' },
		{ id: 7, title: '마케터' },
	];
	const [isActive, setIsActive] = useState(false);
	const [selectedJob, setSelectedJob] = useState(
		'나를 나타내는 타이틀을 선택해주세요.',
	);
	const [isJobSelected, setIsJobSelected] = useState(false);
	const [selectedFile, setSelectedFile] = useState('');

	const handleFileInputChange = e => {
		setSelectedFile(e.target.value);
	};

	const handleTitleInputClick = () => {
		setIsActive(!isActive);
	};

	const handleDropdownItemClick = e => {
		setSelectedJob(e.target.innerText);
		setIsJobSelected(true);
		setIsActive(false);
	};

	return (
		<JoinFormStyled>
			<JoinFormBox>
				<JoinFormBox.Title>추가 정보 입력하기</JoinFormBox.Title>
				<FormContainer>
					<FormItem>
						<FormItem.Title>이메일</FormItem.Title>
						<FormItem.Input placeholder="이메일을 입력해주세요. " {...email} />
					</FormItem>
					<FormItem>
						<FormItem.Title>프로필 사진</FormItem.Title>
						<UploadForm>
							<UploadForm.TextInput
								disabled
								value={selectedFile}
								placeholder="400 x 400 사이즈를 권장합니다"
							/>
							<UploadForm.Input
								type="file"
								id="file"
								onChange={handleFileInputChange}
							/>
							<UploadForm.Button htmlFor="file">파일 찾기</UploadForm.Button>
						</UploadForm>
					</FormItem>
					<FormItem>
						<FormItem.Title>닉네임</FormItem.Title>
						<FormItem.Input
							placeholder="총 여섯글자까지 가능합니다 (띄어쓰기 제외)"
							{...nickname}
						/>
					</FormItem>
					<FormItem>
						<FormItem.Title>타이틀</FormItem.Title>
						<FormItem.Select
							isSelected={isJobSelected}
							onClick={handleTitleInputClick}
						>
							{selectedJob}
							<span className="spreadIcon">
								<SpreadIcon />
							</span>
						</FormItem.Select>
						<DropdownBox active={isActive}>
							{jobs.map(job => (
								<DropdownItem
									key={job.id}
									value={job.title}
									selectedValue={selectedJob}
									onClick={handleDropdownItemClick}
								>
									{job.title}
								</DropdownItem>
							))}
						</DropdownBox>
					</FormItem>
					<FormItem>
						<FormItem.Title>프로필 작성</FormItem.Title>
						<FormItem.TextArea
							placeholder="프로필을 자유롭게 작성해주세요."
							{...description}
						/>
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
				<JoinFormBox.SubmitButton onClick={handleJoinButtonClick}>
					프로필 설정 완료
				</JoinFormBox.SubmitButton>
				<JoinFormBox.SkipButton onClick={handleJoinButtonClick}>
					다음에 입력하기
				</JoinFormBox.SkipButton>
			</JoinFormBox>
		</JoinFormStyled>
	);
};

export default JoinForm;
