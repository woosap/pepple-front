import React from 'react';
import resetCss from 'reset-css';
import { createGlobalStyle } from 'styled-components';
import MainPage from './pages/MainPage';

const GlobalStyle = createGlobalStyle`
  ${resetCss};
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
