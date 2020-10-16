// REACT //
import ReactDOM from 'react-dom';

// ROUTER //
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// REDUX //
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './redux/Store';

// VIEWS //
import Home from './view/Home';
import Course from './view/Course';

let initialState: any;
const store = Store(initialState);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='*' component={() => <div>404</div>} />
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById('app')
);
