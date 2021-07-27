import React from 'react';
import resetCss from 'reset-css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
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
		font-family: Apple SD Gothic Neo;
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
			<BrowserRouter basename="/pepple-front">
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

export default App;
