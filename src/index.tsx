import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './components/App/App';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import reportWebVitals from './reportWebVitals';
import store from './store';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Header className="header" />
			<App className="mainContent" />

			<Footer className="footer" />

		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
