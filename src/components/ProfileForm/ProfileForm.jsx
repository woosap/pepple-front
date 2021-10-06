import React, { useState, useContext } from 'react';
import {
	ProfileFormStyled,
	ProfileFormBox,
	FormContainer,
	FormItem,
	DropdownBox,
	DropdownItem,
	UploadForm,
} from './ProfileForm.styles';
import { ReactComponent as SpreadIcon } from '../../assets/icon/icon-arrow-bottom2.svg';
import DefaultContext from '../../store/default';
import useForm from '../../hooks/useForm';

const ProfileForm = ({ type, handleClose }) => {
	const { jobsObj } = useContext(DefaultContext);
	const [isActive, setIsActive] = useState(false);

	const {
		inputs,
		valid,
		nicknameRef,
		checkNicknameDuplicate,
		handleNicknameChange,
		handleFileChange,
		handleJobChange,
		handleSnsListChange,
		handleInputChange,
		handleJoin,
		handleEdit,
	} = useForm();

	const handleTitleInputClick = () => {
		setIsActive(!isActive);
	};

	const handleDropdownItemClick = e => {
		handleJobChange(e);
		setIsActive(false);
	};

	const handleEditClick = e => {
		handleClose();
		handleEdit(e);
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
								value={inputs.file.name}
								placeholder="400 x 400 사이즈를 권장합니다"
							/>
							<UploadForm.Input
								type="file"
								id="file"
								name="file"
								onChange={handleFileChange}
							/>
							<UploadForm.Button htmlFor="file">파일 찾기</UploadForm.Button>
						</UploadForm>
					</FormItem>
					<FormItem>
						<FormItem.Title>닉네임</FormItem.Title>
						<FormItem.Input
							placeholder="총 여섯글자까지 가능합니다 (띄어쓰기 제외)"
							ref={nicknameRef}
							value={inputs.nickname}
							onBlur={checkNicknameDuplicate}
							onChange={handleNicknameChange}
						/>
					</FormItem>
					{!valid.isFilled && (
						<FormItem.Error>닉네임은 필수 입력 항목입니다. </FormItem.Error>
					)}
					{valid.isDuplicate && (
						<FormItem.Error>중복된 닉네임입니다. </FormItem.Error>
					)}
					<FormItem>
						<FormItem.Title>타이틀</FormItem.Title>
						<FormItem.Select
							onClick={handleTitleInputClick}
							isSelected={inputs.job.value}
						>
							{inputs.job.title}
							<SpreadIcon />
						</FormItem.Select>
						<DropdownBox active={isActive}>
							{jobsObj.map(job => (
								<DropdownItem
									key={job.id}
									className={job.value}
									isSelected={inputs.job.value === job.value}
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
							name="description"
							value={inputs.description}
							onChange={handleInputChange}
							maxLength="72"
						/>
					</FormItem>
					<FormItem>
						<FormItem.Title>SNS 연결하기</FormItem.Title>
						<FormItem.InputList>
							{inputs.snsList.map(snsItem => (
								<FormItem.InputItem
									key={snsItem.id}
									name={snsItem.id}
									value={snsItem.value}
									onChange={handleSnsListChange}
									placeholder="URL을 입력해주세요. "
								/>
							))}
						</FormItem.InputList>
					</FormItem>
				</FormContainer>
				{type === 'join' && (
					<ProfileFormBox.SubmitButton type={type} onClick={handleJoin}>
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
