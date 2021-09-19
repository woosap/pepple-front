import React, { useState, useRef, useContext } from 'react';
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
import AuthContext from '../../store/auth';
import DefaultContext from '../../store/default';

const JoinForm = ({ type, handleJoinButtonClick }) => {
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

	const nicknameInput = useRef();
	const description = useInput('');
	const snsList = [];
	for (let i = 0; i < 4; i += 1) {
		snsList.push({ id: i, value: useInput('') });
	}

	const authContext = useContext(AuthContext);
	const { userImg } = authContext.state;
	const defaultContext = useContext(DefaultContext);
	const { jobs } = defaultContext.state;
	const [nickname, setNickname] = useState('');
	const [isFilled, setIsFilled] = useState(true);
	const [isDuplicate, setIsDuplicate] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const [selectedJobTitle, setSelectedJobTitle] = useState(
		'나를 나타내는 타이틀을 선택해주세요.',
	);
	const [selectedJobValue, setSelectedJobValue] = useState(null);
	const [selectedFile, setSelectedFile] = useState(userImg);

	const checkNickname = async () => {
		if (nickname === '') {
			setIsFilled(false);
			return;
		}
		await axios
			.get(`http://3.36.118.216:8080/nickname?nickname=${nickname}`)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				const errObj = { ...err };
				if (errObj.response.status === 409) {
					setIsDuplicate('중복된 닉네임입니다. ');
				}
			});
	};

	const handleChangeNickname = e => {
		setIsDuplicate(false);
		if (checkInputLetter(e.target.value)) {
			setNickname(e.target.value);
			setIsFilled(true);
		}
	};

	const handleFileInputChange = e => {
		setSelectedFile(e.target.value);
	};

	const handleTitleInputClick = () => {
		setIsActive(!isActive);
	};

	const handleDropdownItemClick = e => {
		setSelectedJobTitle(e.target.innerText);
		setSelectedJobValue(e.target.classList[2]);
		setIsActive(false);
	};

	const handleClick = e => {
		e.preventDefault();
		if (nickname === '' || isDuplicate) {
			nicknameInput.current.focus();
			return;
		}
		const snsUrlList = snsList.map(sns => sns.value);
		handleJoinButtonClick(
			nickname,
			description.value,
			selectedJobValue,
			selectedFile,
			snsUrlList.map(item => item.value),
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
							ref={nicknameInput}
							onBlur={checkNickname}
							onChange={handleChangeNickname}
						/>
					</FormItem>
					{!isFilled && (
						<FormItem.Error>닉네임은 필수 입력 항목입니다.</FormItem.Error>
					)}
					{isDuplicate && (
						<FormItem.Error message={isDuplicate}>{isDuplicate}</FormItem.Error>
					)}
					<FormItem>
						<FormItem.Title>타이틀</FormItem.Title>
						<FormItem.Select
							onClick={handleTitleInputClick}
							isSelected={selectedJobValue}
						>
							{selectedJobTitle}
							<SpreadIcon />
						</FormItem.Select>
						<DropdownBox active={isActive}>
							{jobs.map(job => (
								<DropdownItem
									key={job.id}
									className={job.value}
									isSelected={selectedJobValue === job.value}
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
							maxLength="72"
						/>
					</FormItem>
					<FormItem>
						<FormItem.Title>SNS 연결하기</FormItem.Title>
						<FormItem.InputList>
							{snsList.map(snsItem => (
								<FormItem.InputItem
									key={snsItem.id}
									{...snsItem.value}
									placeholder="URL을 입력해주세요. "
								/>
							))}
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
