import { createStore } from 'redux';

import gameReducer from './reducers/index';

export default createStore(gameReducer);