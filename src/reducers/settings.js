import { StatusBar, Platform } from 'react-native';
import constants from '../constants';
import { createReducer } from '../utils';

let initialState = {};

const settingReducers = {
  toggleMenu(state, bool) {
    if (Platform.OS === 'ios') {
      StatusBar.setHidden(bool, 'slide');
    }
    return state;
  }
};

export default createReducer(initialState, {
  [constants.SETTINGS_MENU]: (state, action) => settingReducers.toggleMenu(state, action.bool)
});
