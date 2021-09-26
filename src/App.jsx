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
import { AgoraProvider } from './store/agora';
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
			<BrowserRouter basename="/pepple-front">
				<AppProvider
					contexts={[
						AuthProvider,
						DefaultProvider,
						RoomProvider,
						AgoraProvider,
					]}
				>
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
	html, body {
		height: 100%;
		background-color: #F5F7FE;
	}

	#root {
		width: 100%;
		height: 100%;
		font-size: 62.5%;
		font-family: Noto Sans KR;
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
