import styled from 'styled-components';

export const CreateRoomFormStyled = styled.div`
	.spreadIcon {
		position: relative;
		right: 23px;
		svg {
			width: 100%;
			height: 100%;
		}
	}
`;

export const FormHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 64px;
	box-shadow: 0px 4px 30px rgba(135, 135, 135, 0.1);
	border-radius: 20px 20px 0px 0px;
	font-family: Apple SD Gothic Neo;
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 19px;
	color: #312944;
	padding-top: 5px;
	box-sizing: border-box;
	position: relative;
`;

export const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const FormItem = styled.div`
	display: flex;
	margin-bottom: 24px;
	align-items: center;
`;

FormItem.Box = styled.div`
	margin: 43px 0 40px 0;
`;

FormItem.CategoryList = styled.div`
	display: flex;
`;

FormItem.Title = styled.div`
	display: inline-block;
	width: 50px;
	margin-right: 45px;
	font-family: Apple SD Gothic Neo;
	font-style: normal;
	font-weight: bold;
	font-size: 13px;
	line-height: 14px;
	color: #312944;
`;

FormItem.CategoryItem = styled.span`
	width: 50px;
	height: 19px;
	background: #ffffff;
	border: 1px solid #6138b9;
	box-sizing: border-box;
	border-radius: 50px;
	margin-right: 8px;
	font-family: Apple SD Gothic Neo;
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 19px;
	text-align: center;
	color: #6138b9;
`;

FormItem.Input = styled.input`
	width: 462px;
	height: 34px;
	padding: 10px 0 10px 12px;
	border: 0.5px solid #e4e4e4;
	box-sizing: border-box;
	border-radius: 5px;
	outline: none;
	::placeholder {
		color: #d7d7d7;
	}
`;

FormItem.Select = styled.select`
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	width: 175px;
	height: 30px;
	border: 0.5px solid #c9c9c9;
	box-sizing: border-box;
	border-radius: 5px;
	padding-left: 12px;
	color: #525252;
	font-size: 12px;
	:focus {
		outline: none;
	}
	option {
		outline: none;
	}
`;

export const SubmitButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 156px;
	height: 44px;
	background: #651eff;
	border-radius: 40px;
	margin-bottom: 43px;
	font-family: Apple SD Gothic Neo;
	font-style: normal;
	font-weight: 350;
	font-size: 20px;
	line-height: 24px;
	color: #ffffff;
	border: none;
	cursor: pointer;
`;