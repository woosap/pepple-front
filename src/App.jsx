/* eslint-disable react/no-children-prop */
import React from 'react';
import resetCss from 'reset-css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import { AuthProvider } from './store/auth';
import { DefaultProvider } from './store/default';
import { RoomProvider } from './store/room';
import LoginRedirect from './components/LoginForm/LoginRedirect';

const AppProvider = ({ contexts, children }) =>
	contexts.reduce(
		(prev, context) =>
			React.createElement(context, {
				children: prev,
			}),
		children,
	);

function App() {
	return (
		<>
			<BrowserRouter basename="/">
				<AppProvider contexts={[AuthProvider, DefaultProvider, RoomProvider]}>
					<Switch>
						<Route path="/" exact component={MainPage} />
						<Route path="/room/:roomId" component={DetailPage} />
						<Route path="/redirect" component={LoginRedirect} />
					</Switch>
				</AppProvider>
			</BrowserRouter>
			<GlobalStyle />
		</>
	);
}

export const GlobalStyle = createGlobalStyle`
	${resetCss};
	@font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 100;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.otf) format('opentype');} @font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 300;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.otf) format('opentype');} @font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 400;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf) format('opentype');} @font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 500;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.otf) format('opentype');} @font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 700;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.otf) format('opentype');} @font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 900;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.otf) format('opentype');}

	html, body {
		height: 100%;
		background-color: #F5F7FE;
		font-family: Noto Sans KR, sans-serif;
	}

	#root {
		width: 100%;
		height: 100%;
		font-size: 62.5%;
		font-family: Noto Sans KR, sans-serif;
		font-weight: normal;
	}

	a {
		text-decoration: none;
	}

	button {
		border: none;
		padding: 0;
	}
`;

export default App;
