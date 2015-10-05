import React from "react-native";
import Reflux from "reflux";
import {KDSocialShare} from "NativeModules";
import {Settings} from "../stores";
import {settingActions} from "../actions";
import Swatches from "../utils/swatches";

const {TouchableOpacity, StyleSheet, Text, View} = React;

export default React.createClass({
  mixins: [Reflux.connect(Settings, "settings")],
  changeColor(hex) {
    settingActions.changeColor(hex);
  },
  render() {
    return (
      <View style={styles.colorPicker}>
        {Swatches.all().map(swatch =>
          <TouchableOpacity
            key={swatch}
            onPress={() => this.changeColor(swatch)}
          >
            <View style={[
              styles.swatches,
              {backgroundColor: swatch},
              swatch === this.state.settings.color && styles.colorSelected
            ]}/>
          </TouchableOpacity>, this)}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  colorPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {}
  },
  swatches: {
    width: 46,
    height: 46
  },
  colorSelected: {
    borderWidth: 2,
    borderColor: "#fff"
  }
});
