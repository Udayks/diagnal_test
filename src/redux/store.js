import { createStore, combineReducers } from 'redux';
import contentReducer from './reducers/contentReducer';

const rootReducer = combineReducers({
    content: contentReducer,
});

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;