import React from "react-native";
import Reflux from "reflux";
import Immutable from "immutable";
import { settingActions } from "../actions";

const {StatusBarIOS, StyleSheet, View} = React;

let settings = new Immutable.Map({
  menu: false,
  color: "#673AB7"
});

export default Reflux.createStore({
  listenables: [settingActions],
  init() {
    StatusBarIOS.setStyle("light-content");
    StatusBarIOS.setHidden(false, "slide");
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
      StatusBarIOS.setHidden(!m, "slide");
      return !m;
    });
    this.trigger(settings.toJS());
  }
});
