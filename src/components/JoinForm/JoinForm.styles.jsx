import styled from 'styled-components';

export const JoinFormStyled = styled.div`
	font-family: Noto Sans KR;
	margin: 30px auto;
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
	margin-bottom: 12px;
	display: flex;

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
	margin-top: 7px;
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
	padding-left: 13px;
	font-size: 12px;

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

FormItem.TextArea = styled.textarea`
	appearance: none;
	width: 75%;
	height: 94px;
	padding-left: 13px;
	background: #fcfcfc;
	border: 0.5px solid #c4c4c4;
	box-sizing: border-box;
	border-radius: 5px;
	resize: none;
	padding-top: 9px;

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
