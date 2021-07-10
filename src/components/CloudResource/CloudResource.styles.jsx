import styled from 'styled-components';

export const CloudResourceStyled = styled.div`
	width: 90%;
	background: #fff;
	border: 0.5px solid #b7b9c8;
	box-sizing: border-box;
	border-radius: 10px;
	margin: 0 auto 12px;
	font-size: 14px;
	position: relative;
	padding: 15px;

	:hover {
		background-color: #fcfcff;

		.removeButton {
			display: block;
		}
	}
`;

export const CloudResourceWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const UploadInfo = styled.div`
	width: calc(100% - 60px);
	color: #6a6a6a;
`;

UploadInfo.Path = styled.div`
	font-size: 1em;
	color: #525252;
	margin-bottom: 5px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: '';
`;

UploadInfo.Uploader = styled.span`
	font-size: 0.8em;
	margin-right: 3px;
`;

UploadInfo.UploadedTime = styled.span`
	font-size: 0.65em;
	font-weight: 250;
`;

export const DownloadButton = styled.button`
	width: 40px;
	height: 40px;
	background-color: #fff;
	float: right;
	border: 0.5px solid #b7b9c8;
	box-sizing: border-box;
	border-radius: 100%;
	padding: 9px;
	cursor: pointer;

	svg {
		width: 16px;
		height: 16px;
	}
`;

export const RemoveButton = styled.button`
	display: none;
	background: none;
	position: absolute;
	top: -7px;
	left: -4px;
	cursor: pointer;
`;
