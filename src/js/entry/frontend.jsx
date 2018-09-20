import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import '../../sass/base.scss';

import App from '../react/App';

ReactDOM.hydrate(
	(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	), document.getElementById('app'),
);
