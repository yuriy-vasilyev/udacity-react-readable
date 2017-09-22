import { combineReducers } from 'redux';
import general from './general';
import categories from './categories';
import posts from './posts';
import comments from './comments';

export default combineReducers({
  general,
  categories,
  posts,
  comments
})
