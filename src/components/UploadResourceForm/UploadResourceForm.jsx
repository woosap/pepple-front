import React, { useState } from 'react';
import {
	UploadResourceFormStyled,
	UploadForm,
	SearchFileButton,
	UploadButton,
} from './UploadResourceForm.styles';

const UploadResourceForm = () => {
	const [type, setType] = useState('file');

	const handleHeaderClick = e => {
		setType(e.target.className);
	};

	return (
		<UploadResourceFormStyled>
			<UploadForm>
				<UploadForm.Header>
					<button type="button" className="file" onClick={handleHeaderClick}>
						파일 업로드하기
					</button>
					<button type="button" className="url" onClick={handleHeaderClick}>
						URL 업로드하기
					</button>
				</UploadForm.Header>
				{type === 'file' ? (
					<>
						<UploadForm.TextInput disabled />
						<UploadForm.Input type="file" id="file" />
						<SearchFileButton htmlFor="file">파일 찾기</SearchFileButton>
					</>
				) : (
					<UploadForm.TextInput />
				)}
				<UploadButton type="submit">업로드</UploadButton>
			</UploadForm>
		</UploadResourceFormStyled>
	);
};

export default UploadResourceForm;
