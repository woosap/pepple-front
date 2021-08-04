import styled from 'styled-components';

export const JoinFormStyled = styled.div`
	margin: 30px auto;
	font-family: Noto Sans KR;
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 18px;
	letter-spacing: -0.03em;
`;

export const JoinFormBox = styled.form``;

JoinFormBox.Title = styled.h3`
	text-align: center;
	color: #6138b9;
	font-size: 17px;
	font-weight: bold;
	margin: 13px 0;
`;

JoinFormBox.SubmitButton = styled.button`
	display: block;
	margin: 0 auto 20px;
	width: 136px;
	height: 42px;
	background: #651eff;
	border-radius: 40px;
	color: #ffffff;
	font-size: 14px;
	cursor: pointer;
`;

JoinFormBox.SkipButton = styled.button`
	display: block;
	margin: 0 auto;
	background: none;
	cursor: pointer;
	font-size: 12px;
`;

export const FormContainer = styled.div`
	margin: 46px auto 37px;
	width: 80%;
`;

export const FormItem = styled.div`
	width: 100%;
	height: 100%;
	margin-bottom: 12px;
	display: flex;
	position: relative;

	:nth-child(5) {
		margin: 18px 0;
	}
`;

FormItem.Title = styled.label`
	display: inline-block;
	width: 25%;
	color: #413757;
	font-size: 13px;
	font-weight: 500;
	line-height: 28px;
`;

FormItem.InputList = styled.div`
	display: inline-block;
	width: 75%;
`;

FormItem.InputItem = styled.input`
	display: inline-block;
	width: 100%;
	height: 28px;
	background: #fcfcfc;
	border: 0.5px solid #c4c4c4;
	box-sizing: border-box;
	border-radius: 5px;
	padding-left: 13px;
	font-size: 12px;
	margin-bottom: 8.5px;

	::placeholder {
		color: #cecece;
		font-size: 12.5px;
		letter-spacing: -0.03em;
	}

	:focus {
		background: #fcfcfc;
		border: 1px solid #6138b9;
		outline: none;
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		letter-spacing: -0.03em;
		color: #7d5dc1;
	}
`;

FormItem.Input = styled.input`
	display: inline-block;
	width: 75%;
	height: 28px;
	background: #fcfcfc;
	border: 0.5px solid #c4c4c4;
	box-sizing: border-box;
	border-radius: 5px;
	padding: 2px 0 0 13px;
	font-size: 12px;
	font-family: Noto Sans KR;
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 18px;
	letter-spacing: -0.03em;
	color: #8e8585;

	::placeholder {
		color: #cecece;
		font-size: 12.5px;
		letter-spacing: -0.03em;
	}

	:focus {
		background: #fcfcfc;
		border: 1px solid #6138b9;
		outline: none;
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		line-height: 18px;
		letter-spacing: -0.03em;
		color: #7d5dc1;
	}
`;

FormItem.Select = styled.div`
	display: flex;
	align-items: center;
	width: 75%;
	height: 28px;
	background: #fcfcfc;
	border: 0.5px solid #c4c4c4;
	box-sizing: border-box;
	border-radius: 5px;
	padding: 2px 0 0 13px;
	position: relative;
	font-size: 12px;
	font-family: Noto Sans KR;
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 18px;
	letter-spacing: -0.03em;
	color: ${props => (props.isSelected ? '#8e8585' : '#cecece')};

	.spreadIcon {
		svg {
			width: 100%;
			height: 100%;
		}
		position: absolute;
		right: 8px;
		cursor: pointer;
	}
`;

FormItem.TextArea = styled.textarea`
	appearance: none;
	resize: none;
	width: 75%;
	height: 94px;
	padding-left: 13px;
	background: #fcfcfc;
	border: 0.5px solid #c4c4c4;
	box-sizing: border-box;
	border-radius: 5px;
	padding-top: 9px;
	font-family: Noto Sans KR;
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 18px;
	letter-spacing: -0.03em;
	color: #8e8585;

	::placeholder {
		color: #cecece;
	}

	:focus {
		background: #fcfcfc;
		border: 1px solid #6138b9;
		outline: none;
		color: #7d5dc1;
	}
`;

export const UploadForm = styled.div`
	width: 75%;
	position: relative;
`;

UploadForm.Input = styled.input`
	display: none;
`;

UploadForm.TextInput = styled.input`
	display: inline-block;
	width: 100%;
	height: 28px;
	background: #fcfcfc;
	border: 0.5px solid #c4c4c4;
	box-sizing: border-box;
	border-radius: 5px;
	padding: 2px 0 0 13px;
	font-size: 12px;
	font-family: Noto Sans KR;
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 18px;
	letter-spacing: -0.03em;
	color: #8e8585;

	:focus {
		outline: none;
	}

	::placeholder {
		color: #cecece;
		font-size: 12.5px;
		letter-spacing: -0.03em;
	}
`;

UploadForm.Button = styled.label`
	color: #cecece;
	cursor: pointer;
	position: absolute;
	top: 6px;
	right: 8px;
	background: none;
	font-size: 12px;
	font-family: Noto Sans KR;
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 18px;
	letter-spacing: -0.03em;
`;

export const DropdownBox = styled.ul`
	position: absolute;
	top: 26px;
	left: 25%;
	display: ${({ active }) => (active ? 'block' : 'none')};
	width: 75%;
	height: 178px;
	padding: 7px 0 10px 15px;
	background: #ffffff;
	border: 0.5px solid #c4c4c4;
	box-sizing: border-box;
	border-radius: 5px;
	z-index: 100;
`;

export const DropdownItem = styled.li`
	font-family: Noto Sans KR;
	font-style: normal;
	font-weight: ${({ value, selectedValue }) =>
		value === selectedValue ? '500' : '300'};
	font-size: 11px;
	letter-spacing: -0.03em;
	line-height: 23px;
	color: ${({ value, selectedValue }) =>
		value === selectedValue ? '#6138b9' : '#A3A3A3'};
	cursor: pointer;
`;
