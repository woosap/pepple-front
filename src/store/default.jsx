import React, { createContext, useState } from 'react';
import DefaultImage from '../assets/img-default.svg';

const DefaultContext = createContext({
	state: {
		defaultUser: null,
		categoriesObj: null,
		jobs: null,
		jobsMapping: null,
	},
	actions: {
		setDefaultUser: () => {},
		setCategoriesObj: () => {},
		setJobs: () => {},
		setJobsMapping: () => {},
	},
});

const DefaultProvider = ({ children }) => {
	const [defaultUser, setDefaultUser] = useState({
		imageUrl: DefaultImage,
		job: 'none',
		nickname: '닉네임',
		profile: '안녕하세요 !',
	});
	const [categoriesObj, setCategoriesObj] = useState({
		DESIGN: { id: 1, title: '디자인', value: 'DESIGN' },
		DEVELOP: { id: 2, title: '개발', value: 'DEVELOP' },
		PROJECT: { id: 3, title: '프로젝트', value: 'PROJECT' },
		STUDY: { id: 4, title: '스터디', value: 'STUDY' },
	});
	const [jobs, setJobs] = useState([
		{ id: 1, title: '기획자', value: 'PLANNER' },
		{ id: 2, title: '디자이너', value: 'DESIGNER' },
		{ id: 3, title: '프론트엔드 개발자', value: 'FRONTEND' },
		{ id: 4, title: '백엔드 개발자', value: 'BACKEND' },
		{ id: 5, title: '마케터', value: 'MARKETER' },
	]);
	const [jobsMapping, setJobsMapping] = useState({
		PLANNER: '기획자',
		DESIGNER: '디자이너',
		FRONTEND: '프론트엔드 개발자',
		BACKEND: '백엔드 개발자',
		MARKETER: '마케터',
		none: '직업을 설정해주세요',
	});
	const value = {
		state: { defaultUser, categoriesObj, jobs, jobsMapping },
		actions: {
			setDefaultUser,
			setCategoriesObj,
			setJobs,
			setJobsMapping,
		},
	};

	return (
		<DefaultContext.Provider value={value}>{children}</DefaultContext.Provider>
	);
};

const { Consumer: DefaultConsumer } = DefaultContext;
export { DefaultProvider, DefaultConsumer };
export default DefaultContext;
