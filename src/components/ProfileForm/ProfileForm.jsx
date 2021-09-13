import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
	JoinFormStyled,
	JoinFormBox,
	FormContainer,
	FormItem,
	DropdownBox,
	DropdownItem,
	UploadForm,
} from './ProfileForm.styles';
import useInput from '../../hooks/useInput';
import { ReactComponent as SpreadIcon } from '../../assets/icon/icon-arrow-bottom2.svg';

const JoinForm = ({ type, handleJoinButtonClick }) => {
	const checkEmail = value => {
		if (value === '') return true;
		const regExp =
			/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		return regExp.test(value);
	};

	const checkNickname = value => {
		let result = true;
		axios
			.get(`http://3.36.118.216:8080/api/nickname?nickname=${value}`)
			.then(res => {
				if (res.status !== 200) {
					result = true;
				}
			})
			.catch(err => console.warn(err));
		return result;
	};

	const checkInputLetter = value => {
		const special = /[`()~!@#$%^&*|\\'"_.,₩;:/?]/gi;
		let len = 0;
		for (let i = 0; i < value.length; i += 1) {
			if (value[i] === ' ') {
				if (value[i + 1] === ' ') return false;
				if (len >= 12) return false;
			} else if (escape(value[i]).length > 4) {
				len += 2;
			} else if (value[i] === '+' || value[i] === '-') {
				return false;
			} else {
				len += 1;
			}
		}
		if (len > 12 || special.test(value)) {
			return false;
		}
		return true;
	};

	const email = useInput('', checkEmail);
	const nickname = useInput('', checkNickname, checkInputLetter);
	const nicknameInput = useRef();
	const description = useInput('');
	const snsList = [];
	for (let i = 0; i < 4; i += 1) {
		snsList.push(useInput(''));
	}
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

	const handleClick = e => {
		e.preventDefault();
		if (nickname.value === '') {
			nickname.setIsFilled(false);
		}
		if (!nickname.isFilled || !nickname.isValid || nickname.value === '') {
			nicknameInput.current.focus();
			return;
		}
		const snsUrlList = snsList.map(sns => sns.value);
		handleJoinButtonClick(
			email.value,
			nickname.value,
			description.value,
			selectedJob,
			selectedFile,
			snsUrlList,
		);
	};

	return (
		<JoinFormStyled>
			<JoinFormBox>
				<JoinFormBox.Title>
					{type === 'join' ? '추가 정보 입력하기' : '프로필 수정하기'}
				</JoinFormBox.Title>
				<FormContainer type={type}>
					<FormItem>
						<FormItem.Title>이메일</FormItem.Title>
						<FormItem.Input placeholder="이메일을 입력해주세요. " {...email} />
					</FormItem>
					{email.isValid || (
						<FormItem.Error>잘못된 이메일 형식입니다. </FormItem.Error>
					)}
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
							ref={nicknameInput}
						/>
					</FormItem>
					{nickname.isFilled || (
						<FormItem.Error>닉네임은 필수 입력 항목입니다.</FormItem.Error>
					)}
					{nickname.isValid || (
						<FormItem.Error>중복된 닉네임입니다. </FormItem.Error>
					)}
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
							<FormItem.InputItem
								placeholder="URL을 입력해주세요."
								{...snsList[0]}
							/>
							<FormItem.InputItem
								placeholder="URL을 입력해주세요."
								{...snsList[1]}
							/>
							<FormItem.InputItem
								placeholder="URL을 입력해주세요."
								{...snsList[2]}
							/>
							<FormItem.InputItem
								placeholder="URL을 입력해주세요."
								{...snsList[3]}
							/>
						</FormItem.InputList>
					</FormItem>
				</FormContainer>
				<JoinFormBox.SubmitButton type={type} onClick={handleClick}>
					{type === 'join' ? '프로필 설정 완료' : '프로필 수정'}
				</JoinFormBox.SubmitButton>
			</JoinFormBox>
		</JoinFormStyled>
	);
};

export default JoinForm;
