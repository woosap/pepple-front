import React, {
	createContext,
	useState,
	useEffect,
	useLayoutEffect,
	useContext,
} from 'react';
import S3FileUpload from 'react-s3';
import DefaultContext from './default';
import DefaultImage from '../assets/img-default.svg';
import api from '../api';

const AuthContext = createContext({
	state: {
		token: null,
		userId: null,
		userImg: DefaultImage,
		logined: false,
		joined: true,
	},
	actions: {
		setToken: () => {},
		setUserId: () => {},
		setUserImg: () => {},
		setIsJoinRequired: () => {},
		setIsLoginRequired: () => {},
	},
	login: () => {},
	join: () => {},
	edit: () => {},
});

const AuthProvider = ({ children }) => {
	const { defaultUser, snsIcons } = useContext(DefaultContext);
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [userId, setUserId] = useState(localStorage.getItem('user'));
	const [userImg, setUserImg] = useState(DefaultImage);
	const [logined, setLogined] = useState(false);
	const [joined, setJoined] = useState(true);
	const [userData, setUserData] = useState(defaultUser);
	const [userSns, setUserSns] = useState({});

	const AWSConfig = {
		bucketName: 'pepple-profileimg',
		region: 'us-east-2',
		accessKeyId: process.env.REACT_APP_AWS_ID,
		secretAcessKey: process.env.REACT_APP_AWS_SECRET,
		headers: { 'Access-Control-Allow-Origin': '*' },
	};

	const login = service => {
		window.location.replace(
			`https://pepple.social/oauth2/authorize/${service}`,
		);
	};

	const join = (nickname, description, job, file, snsList) => {
		if (typeof file === 'object') {
			S3FileUpload.uploadFile(file, AWSConfig)
				.then(res => {
					console.log(res);
					setUserImg(res.location);
				})
				.catch(err => console.warn(err));
		}
		api
			.post(`/user`, {
				imageUrl: userImg,
				job,
				nickname,
				profile: description,
				snsList,
				userId,
			})
			.then(res => {
				setJoined(true);
				setToken(res.data.token);
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('user', userId);
			})
			.catch(err => console.warn(err));
	};

	const edit = (nickname, description, job, file, snsList) => {
		if (typeof file === 'object') {
			S3FileUpload.uploadFile(file, AWSConfig)
				.then(res => {
					console.log(res);
					setUserImg(res.location);
				})
				.catch(err => console.warn(err));
		}
		api
			.put(
				`/user`,
				{
					imageUrl: file || userImg,
					job,
					nickname,
					profile: description,
					snsList,
					userId,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};

	const getDetail = () => {
		api
			.get(`/auth/detail`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				setUserData(res.data);
			})
			.catch(err => console.log(err));
	};

	const getIcons = () => {
		const snsNames = Object.keys(snsIcons);
		const newObj = {};
		userData.snsList.forEach(url => {
			for (let i = 0; i < snsNames.length; i += 1) {
				if (url.indexOf(snsNames[i]) > -1) {
					newObj[snsNames[i]] = { url, icon: snsIcons[snsNames[i]] };
					break;
				} else if (i === snsNames.length - 1) {
					newObj.etc = { url, icon: snsIcons.blog };
					break;
				}
			}
		});
		setUserSns({
			...newObj,
		});
	};

	useEffect(() => {
		getIcons();
	}, [userData]);

	useLayoutEffect(() => {
		if (token) {
			setLogined(true);
			setJoined(true);
			getDetail();
		}
	}, []);

	const value = {
		state: { token, userId, userImg, logined, joined, userData, userSns },
		actions: {
			setToken,
			setUserId,
			setUserImg,
			setLogined,
			setJoined,
		},
		login,
		join,
		edit,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const { Consumer: AuthConsumer } = AuthContext;
export { AuthProvider, AuthConsumer };
export default AuthContext;
