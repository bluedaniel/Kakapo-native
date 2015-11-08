import React from "react-native";
import Reflux from "reflux";
import Immutable from "immutable";
import findWhere from "lodash/collection/findWhere";
import {soundActions} from "../actions";
import kakapoAssets from "kakapo-assets";

const {NativeModules, AsyncStorage, ListView} = React;
const {AudioModule} = NativeModules;
const STORAGE_KEY = "@AsyncStorageSounds:key";

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

let sounds = new Immutable.OrderedMap();
let soundsMulti = new Immutable.OrderedMap();

var SoundStore = Reflux.createStore({
  listenables: [soundActions],
  async getSounds() {
    var data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) data = JSON.stringify(kakapoAssets.sounds);
    data = JSON.parse(data);
    for (let _s in data) {
      sounds = sounds.set(data[_s].file, Object.assign({}, data[_s], {
        recentlyDownloaded: false
      }));
    }
    this.setSounds();
    this.trigger(ds.cloneWithRows(sounds.toArray()));
  },
  setSounds() {
    sounds.forEach(s => {
      AudioModule.setSound(s.file, Math.round(s.volume * 100));
      if (s.playing) AudioModule.togglePlay(s.file);
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
    AudioModule.togglePlay(sound.file);
    sounds = sounds.update(sound.file, s => Object.assign({}, s, { playing: !s.playing }));
    if (multi) soundsMulti = soundsMulti.clear();
    this.trigger(ds.cloneWithRows(sounds.toArray()));
  },
  onChangeVolume(sound, volume, trigger) {
    AudioModule.changeVolume(sound.file, Math.round(volume * 100));
    sounds = sounds.update(sound.file, s => Object.assign({}, s, { volume: volume }));
    if (trigger) this.trigger(ds.cloneWithRows(sounds.toArray()));
  }
});

SoundStore.listen(() => AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sounds)));

export default SoundStore;
