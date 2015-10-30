import React from "react-native";
import Reflux from "reflux";
import Immutable from "immutable";
import { settingActions } from "../actions";

const STORAGE_KEY = "@AsyncStorageSettings:key";
const {AsyncStorage, StatusBarIOS, StyleSheet, View} = React;

let settings = new Immutable.Map({ menu: false });

let SettingsStore = Reflux.createStore({
  listenables: [settingActions],
  init() {
    if (process.env.os === "ios") {
      StatusBarIOS.setStyle("light-content");
      StatusBarIOS.setHidden(false, "slide");
    }
  },
  async getTheme() {
    var themeData = await AsyncStorage.getItem(STORAGE_KEY);
    settings = settings.set("color", themeData || "#673AB7");
    this.trigger(settings.toJS());
  },
  getInitialState() {
    return settings.toJS();
  },
  onChangeColor(color) {
    settings = settings.update("color", () => color);
    this.trigger(settings.toJS());
  },
  onMenuToggle(guestured) {
    if (guestured !== null && guestured === settings.get("menu")) return;
    settings = settings.update("menu", m => {
      if (process.env.os === "ios") StatusBarIOS.setHidden(!m, "slide");
      return !m;
    });
    this.trigger(settings.toJS());
  }
});

SettingsStore.listen(data => AsyncStorage.setItem(STORAGE_KEY, settings.get("color")));

export default SettingsStore;
