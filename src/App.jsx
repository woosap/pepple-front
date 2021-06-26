import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';

function App() {
	return (
		<>
			<BrowserRouter basename="/Pepple-front">
				<Switch>
					<Route path="/" component={MainPage} exact />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
