import { combineReducers } from 'redux';
import storyReducer from './story';

const rootReducer = combineReducers({
    story: storyReducer,
});

export default rootReducer;
