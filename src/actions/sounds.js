import { AsyncStorage } from 'react-native';
import constants from '../constants';

const STORAGE_KEY = '@AsyncStorageSounds:key';

const actions = {
  soundsInit: () => dispatch => {
    AsyncStorage.getItem(STORAGE_KEY).then(resp => dispatch(actions.fetchSoundsComplete(resp)));
    return ({ type: constants.SOUNDS_INIT });
  },
  soundsPlay: (sound) => ({ type: constants.SOUNDS_PLAY, sound }),
  soundsVolume: (sound, volume) => ({ type: constants.SOUNDS_VOLUME, sound, volume }),
  soundsToggleAll: ({ type: constants.SOUNDS_TOGGLE_ALL }),

  fetchSoundsComplete: resp => ({ type: constants.SOUNDS_RECEIVED, resp })
};

export default actions;
