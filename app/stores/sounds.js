import Reflux from "reflux";
import React from "react-native";
import Immutable from "immutable";
import {soundActions} from "../actions";
import SoundsJson from "../data/sounds.json";

const {AsyncStorage} = React;
const STORAGE_KEY = "@AsyncStorageSounds:key";

let sounds = new Immutable.OrderedMap();
let mute = false;

var SoundStore = Reflux.createStore({
  listenables: [soundActions],
  async getSounds() {
    let data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) {
      data = JSON.stringify(SoundsJson);
      await AsyncStorage.setItem(STORAGE_KEY, data);
    }
    JSON.parse(data).forEach(s => sounds = sounds.set(s.file, {...s, ...{ recentlyDownloaded: false }}));
    return sounds.toArray();
  },
  getInitialState() {
    return sounds.toArray();
  },
  onToggleMute(muteToggle) {
    mute = muteToggle;
  },
  onTogglePlayPause(sound) {
    sounds = sounds.update(sound.file, s => ({...s, ...{ playing: !s.playing }}));
    this.trigger(sounds.toArray());
  },
  onChangeVolume(sound, volume) {
    sounds = sounds.update(sound.file, s => ({...s, ...{ volume: volume }}));
    this.trigger(sounds.toArray());
  },
});

export default SoundStore;
