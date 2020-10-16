import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './Reducers';

export const Store = (initialState: any) => {
	return createStore(rootReducer, initialState, applyMiddleware(reduxThunk));
};
