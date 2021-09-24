import React, { useState, useRef, useContext } from 'react';
import {
	ProfileFormStyled,
	ProfileFormBox,
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
import api from '../../api';

const ProfileForm = ({ type, user }) => {
	const authContext = useContext(AuthContext);
	const { userImg } = authContext.state;
	const { jobsObj, jobsMapping } = useContext(DefaultContext);

	const [file, setFile] = useState(user ? user.imageUrl : userImg);
	const [nickname, setNickname] = useState(user ? user.nickname : '');
	const nicknameInput = useRef();
	const description = useInput(user ? user.profile : '');
	const [jobTitle, setJobTitle] = useState(
		user && user.job
			? jobsMapping[user.job]
			: '나를 나타내는 타이틀을 선택해주세요. ',
	);
	const [jobValue, setJobValue] = useState(user && user.job ? user.job : null);
	const [isFilled, setIsFilled] = useState(true);
	const [isDuplicate, setIsDuplicate] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const snsList = [];
	for (let i = 0; i < 4; i += 1) {
		snsList.push({ id: i, value: useInput(user ? user.snsList[i] : '') });
	}

	const checkInput = input => {
		const special = /[`()~!@#$%^&*|\\'"_.,₩;:/?]/gi;
		let len = 0;
		for (let i = 0; i < input.length; i += 1) {
			if (input[i] === ' ') {
				if (input[i + 1] === ' ') return false;
				if (len >= 12) return false;
			} else if (escape(input[i]).length > 4) {
				len += 2;
			} else if (input[i] === '+' || input[i] === '-') {
				return false;
			} else {
				len += 1;
			}
		}
		if (len > 12 || special.test(input)) {
			return false;
		}
		return true;
	};

	const checkNickname = async () => {
		if (nickname === '') {
			setIsFilled(false);
			return;
		}
		await api
			.get(`/nickname?nickname=${nickname}`)
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
		if (checkInput(e.target.value)) {
			setNickname(e.target.value);
			setIsFilled(true);
		}
	};

	const handleFileInputChange = e => {
		setFile(e.target.value);
	};

	const handleTitleInputClick = () => {
		setIsActive(!isActive);
	};

	const handleDropdownItemClick = e => {
		setJobTitle(e.target.innerText);
		setJobValue(e.target.classList[2]);
		setIsActive(false);
	};

	const handleJoinClick = e => {
		e.preventDefault();
		if (nickname === '') {
			setIsDuplicate('닉네임은 필수 입력 항목입니다. ');
			nicknameInput.current.focus();
			return;
		}
		const snsUrlList = snsList.map(sns => sns.value);
		authContext.join(
			nickname,
			description.value,
			jobValue,
			file,
			snsUrlList.map(item => item.value),
		);
	};

	const handleEditClick = e => {
		e.preventDefault();
		if (nickname === '') {
			setIsDuplicate('닉네임은 필수 입력 항목입니다. ');
			nicknameInput.current.focus();
			return;
		}
		const snsUrlList = snsList.map(sns => sns.value);
		authContext.edit(
			nickname,
			description.value,
			jobValue,
			file,
			snsUrlList.map(item => item.value),
		);
	};

	return (
		<ProfileFormStyled>
			<ProfileFormBox>
				<ProfileFormBox.Title>
					{type === 'join' ? '추가 정보 입력하기' : '프로필 수정하기'}
				</ProfileFormBox.Title>
				<FormContainer type={type}>
					<FormItem>
						<FormItem.Title>프로필 사진</FormItem.Title>
						<UploadForm>
							<UploadForm.TextInput
								disabled
								value={file}
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
							value={nickname}
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
							isSelected={jobValue}
						>
							{jobTitle}
							<SpreadIcon />
						</FormItem.Select>
						<DropdownBox active={isActive}>
							{jobsObj.map(job => (
								<DropdownItem
									key={job.id}
									className={job.value}
									isSelected={jobValue === job.value}
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
				{type === 'join' && (
					<ProfileFormBox.SubmitButton type={type} onClick={handleJoinClick}>
						프로필 설정 완료
					</ProfileFormBox.SubmitButton>
				)}
				{type === 'edit' && (
					<ProfileFormBox.SubmitButton type={type} onClick={handleEditClick}>
						프로필 수정 완료
					</ProfileFormBox.SubmitButton>
				)}
			</ProfileFormBox>
		</ProfileFormStyled>
	);
};

export default ProfileForm;
