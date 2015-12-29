import { AsyncStorage } from 'react-native';
import constants from '../constants';

const STORAGE_KEY = '@AsyncStorageSettings:key';

const actions = {
  getTheme: () => dispatch => {
    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      let color = '#673AB7';
      if (data) {
        data = JSON.parse(data);
        color = data.palette[0];
      }
      dispatch(actions.themesChange(color));
    });
    return ({ type: constants.THEMES_FETCHING });
  },
  themesChange: (swatch) => ({ type: constants.THEMES_CHANGE, swatch })
};

export default actions;
