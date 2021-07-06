import React from 'react';
import Header from '../components/Header/Header';
import ProfileView from '../components/ProfileView/ProfileView';

const MainPage = ({ user }) => {
	return (
		<>
			<Header />
			<ProfileView user={user} />
		</>
	);
};

export default MainPage;

MainPage.defaultProps = {
	user: {
		id: 1,
		name: '쭈꾸미 개발자',
		job: 'FRONTEND',
		description:
			'쭈꾸미처럼 맛있게 성장하고 싶은 쭈꾸미 프론트엔드 개발자 입니다. 쭈꾸미처럼 맛있게 성장하고 싶은 쭈꾸미 프론트엔드 개발자 입니다',
		sns: [
			{ id: 1, sort: 'blog', link: 'blog_link' },
			{ id: 2, sort: 'github', link: 'github_link' },
			{ id: 3, sort: 'instagram', link: 'instagram_link' },
			{ id: 4, sort: 'facebook', link: 'facebook_link' },
		],
	},
};
