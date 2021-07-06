import React from 'react';
import resetCss from 'reset-css';
import { createGlobalStyle } from 'styled-components';
import MainPage from './pages/MainPage';

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
`;

function App() {
	return (
		<>
			<MainPage />
			<GlobalStyle />
		</>
	);
}

export default App;
