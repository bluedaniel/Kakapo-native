import { NativeModules, AsyncStorage } from 'react-native';
import { Map } from 'immutable';
import kakapoAssets from 'kakapo-assets';
import constants from '../constants';
import { createReducer } from '../utils';
import { observableStore } from '../stores/configureStore';

const { AudioModule } = NativeModules;
const STORAGE_KEY = '@AsyncStorageSounds:key';

let initialState = new Map();
let soundsMulti = new Map();
let mute = false;

const soundReducers = {
  init(state, sounds) {
    let data = kakapoAssets.sounds;
    if (sounds) data = JSON.parse(sounds);
    for (let _s in data) {
      state = state.set(data[_s].file, ({ ...data[_s], ...{
        recentlyDownloaded: false
      } }));
      AudioModule.setSound(data[_s].file, data[_s].volume);
      if (data[_s].playing) AudioModule.togglePlay(data[_s].file);
    }
    this.saveToStorage();
    return state;
  },

  toggleAll(state) {
    state.map(_s => {
      if (_s.playing) state = this.togglePlay(state, _s);
    });
    return state;
  },

  togglePlay(state, sound) {
    AudioModule.togglePlay(sound.file);
    return state.update(sound.file, _s => ({ ..._s, ...{ playing: !_s.playing } }));
  },

  changeVolume(state, sound, volume) {
    AudioModule.changeVolume(sound.file, Math.round(volume * 100));
    return state.update(sound.file, _s => ({ ..._s, ...{ volume: volume } }));
  },

  saveToStorage() {
    observableStore.subscribe(_x => {
      if (initialState === _x.sounds) return; // Still the same state
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(_x.sounds));
    });
  }
};

export default createReducer(initialState, {
  [constants.SOUNDS_INIT]: state => soundReducers.init(state),
  [constants.SOUNDS_RECEIVED]: (state, action) => soundReducers.init(state, action.resp),
  [constants.SOUNDS_PLAY]: (state, action) => soundReducers.togglePlay(state, action.sound),
  [constants.SOUNDS_VOLUME]: (state, action) => soundReducers.changeVolume(state, action.sound, action.volume),
  [constants.SOUNDS_TOGGLE_ALL]: state => soundReducers.toggleAll(state)
});
