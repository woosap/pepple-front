import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import resetCss from 'reset-css';
import { createGlobalStyle } from 'styled-components';
import MainPage from './pages/MainPage';

const GlobalStyle = createGlobalStyle`
  ${resetCss};
`;

function App() {
	return (
		<>
			<BrowserRouter basename="/Pepple-front">
				<Switch>
					<Route path="/" component={MainPage} exact />
				</Switch>
			</BrowserRouter>
			<GlobalStyle />
		</>
	);
}

export default App;
