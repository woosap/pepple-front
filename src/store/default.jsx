import React, { createContext } from 'react';
import DefaultImage from '../assets/img-default.svg';
import BehanceIcon from '../assets/icon-sns/behance.svg';
import BlogIcon from '../assets/icon-sns/blog.svg';
import BrunchIcon from '../assets/icon-sns/brunch.svg';
import FacebookIcon from '../assets/icon-sns/facebook.svg';
import GithubIcon from '../assets/icon-sns/github.svg';
import TwitterIcon from '../assets/icon-sns/twitter.svg';

const DefaultContext = createContext({
	defaultUser: null,
	categoriesObj: null,
	jobs: null,
	jobsMapping: null,
	sns: [],
});

const DefaultProvider = ({ children }) => {
	const defaultUser = {
		imageUrl: DefaultImage,
		job: null,
		nickname: '닉네임',
		profile: '안녕하세요 ! 페플에서 함께 성장할 동료를 찾아보세요 😀',
		snsList: [],
	};

	const categoriesObj = {
		DESIGN: { id: 1, title: '디자인', value: 'DESIGN' },
		DEVELOP: { id: 2, title: '개발', value: 'DEVELOP' },
		PROJECT: { id: 3, title: '프로젝트', value: 'PROJECT' },
		STUDY: { id: 4, title: '스터디', value: 'STUDY' },
	};

	const jobsObj = [
		{ id: 1, title: '기획자', value: 'PLANNER' },
		{ id: 2, title: '디자이너', value: 'DESIGNER' },
		{ id: 3, title: '프론트엔드 개발자', value: 'FRONTEND' },
		{ id: 4, title: '백엔드 개발자', value: 'BACKEND' },
		{ id: 5, title: '마케터', value: 'MARKETER' },
	];

	const jobsMapping = {
		PLANNER: '기획자',
		DESIGNER: '디자이너',
		FRONTEND: '프론트엔드 개발자',
		BACKEND: '백엔드 개발자',
		MARKETER: '마케터',
		none: '나를 나타내는 타이틀을 설정해주세요',
	};

	const snsIcons = {
		github: GithubIcon,
		facebook: FacebookIcon,
		twitter: TwitterIcon,
		behance: BehanceIcon,
		brunch: BrunchIcon,
		blog: BlogIcon,
	};

	const value = {
		defaultUser,
		categoriesObj,
		jobsObj,
		jobsMapping,
		snsIcons,
	};

	return (
		<DefaultContext.Provider value={value}>{children}</DefaultContext.Provider>
	);
};

const { Consumer: DefaultConsumer } = DefaultContext;
export { DefaultProvider, DefaultConsumer };
export default DefaultContext;
