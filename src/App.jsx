import React from 'react';
import resetCss from 'reset-css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import { AuthProvider } from './store/auth';
import LoginRedirect from './components/LoginForm/LoginRedirect';

const GlobalStyle = createGlobalStyle`
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

function App() {
	return (
		<>
			<BrowserRouter basename="/">
				<Switch>
					<Route path="/" exact>
						<MainPage />
					</Route>
					<Route path="/room">
						<DetailPage />
					</Route>
					<Route path="/redirect" component={LoginRedirect} />
				</Switch>
			</BrowserRouter>
			<GlobalStyle />
		</>
	);
}

export default () => (
	<AuthProvider>
		<App />
	</AuthProvider>
);
