import { combineReducers } from 'redux';
import courseReducer from './courses';

const rootReducer = combineReducers({
  courseData: courseReducer,
});


export default rootReducer;
