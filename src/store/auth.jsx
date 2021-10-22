import React, {
	createContext,
	useState,
	useEffect,
	useLayoutEffect,
	useContext,
} from 'react';
import AWS from 'aws-sdk';
import nextId from 'react-id-generator';
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
	const { snsIcons } = useContext(DefaultContext);
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [userId, setUserId] = useState(localStorage.getItem('user'));
	const [userImg, setUserImg] = useState(DefaultImage);
	const [logined, setLogined] = useState(false);
	const [joined, setJoined] = useState(true);
	const [userData, setUserData] = useState(null);
	const [userSns, setUserSns] = useState({});

	AWS.config.update({
		region: 'us-east-2',
		credentials: new AWS.CognitoIdentityCredentials({
			IdentityPoolId: process.env.REACT_APP_AWS_POOL_ID,
		}),
	});

	const getDetail = () => {
		api
			.get(`/auth/detail`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				setUserData(res.data);
				if (!userId) {
					setUserId(res.data.userId);
					localStorage.setItem('user', res.data.userId);
				}
			})
			.catch(err => console.log(err));
	};

	const login = service => {
		window.location.replace(
			`https://pepple.social/oauth2/authorize/${service}`,
		);
	};

	const join = (nickname, description, job, file, snsList) => {
		if (typeof file !== 'object') {
			api
				.post('/user', {
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
				.catch(error => console.warn(error));
		} else {
			const upload = new AWS.S3.ManagedUpload({
				params: {
					Bucket: 'pepple-profileimg',
					Key: `${nextId()}.${file.type.split('/')[1]}`,
					Body: file,
				},
			});
			upload.send((err, data) => {
				if (err) {
					console.log(err);
				} else if (data) {
					console.log(data);
				}
				api
					.post('/user', {
						imageUrl: data?.Location || null,
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
					.catch(error => console.warn(error));
			});
		}
	};

	const edit = (nickname, description, job, file, snsList) => {
		if (typeof file !== 'object') {
			api
				.put(
					`/user`,
					{
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
				.then(res => {
					console.log(res);
					getDetail();
				})
				.catch(err => {
					console.log(err);
					getDetail();
				});
		} else {
			const upload = new AWS.S3.ManagedUpload({
				params: {
					Bucket: 'pepple-profileimg',
					Key: `${nextId()}.${file.type.split('/')[1]}`,
					Body: file,
				},
			});
			upload.send((err, data) => {
				if (err) {
					console.log(err);
				} else if (data) {
					console.log(data);
				}
				api
					.put(
						`/user`,
						{
							imageUrl: data.Location || userImg,
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
					.then(res => {
						console.log(res);
						getDetail();
					})
					.catch(error => {
						console.log(error);
						getDetail();
					});
			});
		}
	};

	const getIcons = () => {
		const snsNames = Object.keys(snsIcons);
		const newObj = {};
		userData?.snsList.forEach(url => {
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

	const checkToken = async () => {
		try {
			const res = await api.get('/auth', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return res.data.authorized;
		} catch (err) {
			return false;
		}
	};

	useEffect(() => {
		getIcons();
	}, [userData]);

	useLayoutEffect(() => {
		const setAuth = async () => {
			if (token) {
				const result = await checkToken();
				if (!result) {
					localStorage.removeItem('token');
					localStorage.removeItem('user');
					setToken(null);
					setUserId(null);
					setLogined(false);
					setJoined(true);
					return;
				}
				setLogined(true);
				setJoined(true);
				getDetail();
			}
		};
		setAuth();
	}, [token]);

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
		checkToken,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const { Consumer: AuthConsumer } = AuthContext;
export { AuthProvider, AuthConsumer };
export default AuthContext;
