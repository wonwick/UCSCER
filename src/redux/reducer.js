import { combineReducers } from 'redux';
import subjects from './reducers/subjects';
import auth from './reducers/auth';
import common from './reducers/common';
import feed from './reducers/feed';

import { routerReducer } from 'react-router-redux';

export default combineReducers({
    subjects,
    auth,
    common,
    feed,
    router: routerReducer
});