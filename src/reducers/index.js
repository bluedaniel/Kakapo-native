import { combineReducers } from 'redux';
import settings from './settings';
import sounds from './sounds';
import themes from './themes';

export default combineReducers({
  sounds,
  settings,
  themes
});
