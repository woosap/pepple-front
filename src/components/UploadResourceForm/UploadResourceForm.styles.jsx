import styled from 'styled-components';

export const UploadResourceFormStyled = styled.div`
	width: 320px;
	height: 140px;
	background: #fff;
	border: 0.5px solid #c9cdfa;
	box-sizing: border-box;
	border-radius: 15px;
	position: absolute;
	top: 50px;
	right: -45%;
	z-index: 100;
	display: flex;
	flex-direction: column;
`;

export const UploadForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 14px 20px 19px 20px;
`;

UploadForm.Header = styled.div`
	align-self: flex-start;
	button {
		display: inline-block;
		color: #b9b9b9;
		font-weight: 500;
		font-size: 12px;
		font-style: normal;
		line-height: 18px;
		letter-spacing: -0.01em;
		background: #fff;
		cursor: pointer;
	}

	.file {
		margin-right: 13px;
	}

	${({ type }) =>
		type === 'file' ? '.file {color: #6138B9;}' : '.url {color: #6138B9;}'}
`;

UploadForm.Input = styled.input`
	display: none;
`;

UploadForm.TextInput = styled.input`
	width: 280px;
	height: 19px;
	padding-right: 55px;
	background: #fff;
	border: 0.5px solid #b7b9c8;
	box-sizing: border-box;
	border-radius: 5px;
	margin: 20px 0 27px 0;

	:focus {
		outline: none;
	}
`;

export const SearchFileButton = styled.label`
	position: absolute;
	top: 53px;
	right: 26px;
	font-size: 8px;
	font-weight: 500;
	line-height: 18px;
	letter-spacing: -0.05em;
	color: #9ea6fe;
	cursor: pointer;
`;

export const UploadButton = styled.button`
	display: block;
	width: 72px;
	height: 24px;
	background: #9ea6fe;
	border-radius: 20px;
	color: #fff;
	font-size: 12px;
	font-weight: 500;
	line-height: 18px;
	letter-spacing: -0.05em;
	cursor: pointer;
`;
