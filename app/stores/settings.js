import Reflux from "reflux";
import React from "react-native";
import Immutable from "immutable";
import { settingActions } from "../actions";

let settings = new Immutable.Map({color: "#532F93"});

export default Reflux.createStore({
  listenables: [settingActions],
  getInitialState() {
    return settings.toJS();
  },
  onChangeColor(color) {
    settings = settings.update("color", () => color);
    this.trigger(settings.toJS());
  }
});
