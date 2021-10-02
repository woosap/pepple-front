import { useState, useContext, useRef, useEffect } from 'react';
import api from '../api';
import AuthContext from '../store/auth';
import DefaultContext from '../store/default';

const useForm = () => {
	const authContext = useContext(AuthContext);
	const { userImg, userData } = authContext.state;
	const { jobsMapping } = useContext(DefaultContext);
	const [inputs, setInputs] = useState({
		file: userData?.imageUrl || userImg,
		nickname: userData?.nickname || '',
		job: {
			title: userData?.job
				? jobsMapping[userData?.job]
				: '나를 나타내는 타이틀을 선택해주세요. ',
			value: userData?.job,
		},
		description: userData?.profile || '',
		snsList: [],
	});
	const [valid, setValid] = useState({
		isFilled: true,
		isDuplicate: false,
	});
	const nicknameRef = useRef();

	const checkNicknameInput = input => {
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

	const checkNicknameDuplicate = () => {
		if (inputs.nickname === '') {
			setValid({
				...valid,
				isFilled: false,
			});
		}
		api
			.get(`/nickname?nickname=${inputs.nickname}`)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				const errObj = { ...err };
				if (errObj.response.status === 409) {
					setValid({
						...valid,
						isDuplicate: true,
					});
				}
			});
	};

	const handleNicknameChange = e => {
		if (checkNicknameInput(e.target.value)) {
			setInputs({
				...inputs,
				nickname: e.target.value,
			});
			setValid({
				...valid,
				isFilled: true,
				isDuplicate: false,
			});
		}
	};

	const handleJobChange = e => {
		setInputs({
			...inputs,
			job: {
				title: e.target.innerText,
				value: e.target.classList[2],
			},
		});
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const handleJoinClick = e => {
		e.preventDefault();
		if (inputs.nickname === '') {
			setValid({
				...valid,
				isFilled: false,
			});
			nicknameRef.current.focus();
		}
		authContext.join(
			inputs.nickname,
			inputs.description,
			inputs.job.value,
			inputs.file,
			inputs.snsList.filter(item => item.value !== '').map(item => item.value),
		);
	};

	const handleSnsListChange = e => {
		const { name, value } = e.target;
		const arr = [...inputs.snsList];
		arr[name] = { id: name, value };
		setInputs({
			...inputs,
			snsList: arr,
		});
	};

	const handleEditClick = e => {
		e.preventDefault();
		if (inputs.nickname === '') {
			setValid({
				...valid,
				isFilled: false,
			});
			nicknameRef.current.focus();
		}
		authContext.edit(
			inputs.nickname,
			inputs.description,
			inputs.job.value,
			inputs.file,
			inputs.snsList.filter(item => item.value !== '').map(item => item.value),
		);
	};

	useEffect(() => {
		const arr = [];
		for (let i = 0; i < 4; i += 1) {
			arr.push({ id: i, value: userData?.snsList[i] || '' });
		}
		setInputs({
			...inputs,
			snsList: arr,
		});
		console.log(userData);
	}, []);

	return {
		inputs,
		valid,
		nicknameRef,
		checkNicknameDuplicate,
		handleNicknameChange,
		handleJobChange,
		handleSnsListChange,
		handleInputChange,
		handleJoinClick,
		handleEditClick,
	};
};

export default useForm;
