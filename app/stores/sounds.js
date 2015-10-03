import Reflux from "reflux";
import React from "react-native";
import Immutable from "immutable";
import throttle from "lodash/function/throttle";
import findWhere from "lodash/collection/findWhere";
import {SwiftAudio} from "NativeModules";
import { soundActions } from "../actions";
import SoundsJson from "../data/sounds.json";

const {AsyncStorage, ListView} = React;
const STORAGE_KEY = "@AsyncStorageSounds:key";

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

let sounds = new Immutable.OrderedMap();
let howls = new Immutable.Map();
let mute = false;

var SoundStore = Reflux.createStore({
  listenables: [soundActions],
  async getSounds() {
    let data = await AsyncStorage.getItem(STORAGE_KEY);
    data = null;
    if (!data) {
      data = JSON.stringify(SoundsJson);
      await AsyncStorage.setItem(STORAGE_KEY, data);
    }
    JSON.parse(data).forEach(s => sounds = sounds.set(s.file, {...s, ...{ recentlyDownloaded: false }}));
    this.setSwiftSounds();
    this.trigger(ds.cloneWithRows(sounds.toArray()));
  },
  setSwiftSounds() {
    sounds.forEach(s => SwiftAudio.setSound(s.file));
  },
  getInitialState() {
    return ds.cloneWithRows(sounds.toArray());
  },
  onToggleMute(muteToggle) {
    mute = muteToggle;
  },
  onTogglePlayPause(sound) {
    console.log(SwiftAudio);
    SwiftAudio.togglePlay(sound.file);
    sounds = sounds.update(sound.file, s => ({...s, ...{ playing: !s.playing }}));
    this.trigger(ds.cloneWithRows(sounds.toArray()));
  },
  onChangeVolume(sound, volume) {
    sounds = sounds.update(sound.file, s => ({...s, ...{ volume: volume }}));
    this.trigger(ds.cloneWithRows(sounds.toArray()));
  }
});

// SoundStore.listen(throttle(() => console.log(sounds.toArray()), 1000));

export default SoundStore;
