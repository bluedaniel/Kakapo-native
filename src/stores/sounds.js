import React from "react-native";
import Reflux from "reflux";
import Immutable from "immutable";
import findWhere from "lodash/collection/findWhere";
import {soundActions} from "../actions";
import SoundsJson from "../data/sounds.json";
const {NativeModules, AsyncStorage, ListView} = React;
const {SwiftAudio} = NativeModules;
const STORAGE_KEY = "@AsyncStorageSounds:key";

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

let sounds = new Immutable.OrderedMap();
let soundsMulti = new Immutable.OrderedMap();

var SoundStore = Reflux.createStore({
  listenables: [soundActions],
  async getSounds() {
    var data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) data = JSON.stringify(SoundsJson);
    data = JSON.parse(data);
    for (var _s in data) {
      sounds = sounds.set(data[_s].file, Object.assign({}, data[_s], {
        recentlyDownloaded: false
      }));
    }
    this.setSwiftSounds();
    this.trigger(ds.cloneWithRows(sounds.toArray()));
  },
  setSwiftSounds() {
    sounds.forEach(s => {
      SwiftAudio.setSound(s.file);
      if (s.playing) SwiftAudio.togglePlay(s.file);
    });
  },
  getInitialState() {
    return ds.cloneWithRows(sounds.toArray());
  },
  getMultipleStatus() {
    if (soundsMulti.count() && !sounds.filter(s => s.playing).count()) return 2;
    if (sounds.filter(s => s.playing).count()) return 1;
    return false;
  },
  onToggleMultiple() {
    if (!soundsMulti.count()) soundsMulti = sounds.filter(s => s.playing);
    soundsMulti.forEach(s => soundActions.togglePlayPause(s, false));
    this.trigger(ds.cloneWithRows(sounds.toArray()));
  },
  onTogglePlayPause(sound, multi) {
    SwiftAudio.togglePlay(sound.file);
    sounds = sounds.update(sound.file, s => Object.assign({}, s, { playing: !s.playing }));
    if (multi) soundsMulti = soundsMulti.clear();
    this.trigger(ds.cloneWithRows(sounds.toArray()));
  },
  onChangeVolume(sound, volume, trigger) {
    SwiftAudio.changeVolume(sound.file, Math.round(volume * 100));
    sounds = sounds.update(sound.file, s => Object.assign({}, s, { volume: volume }));
    if (trigger) this.trigger(ds.cloneWithRows(sounds.toArray()));
  }
});

SoundStore.listen(() => AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sounds)));

export default SoundStore;
