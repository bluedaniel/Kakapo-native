import React from "react-native";
import Reflux from "reflux";
import {Icon} from "react-native-icons";
import {Settings, Sounds} from "../stores";
import {settingActions, soundActions} from "../actions";

const {TouchableOpacity, Image, StyleSheet, Text, View} = React;

export default React.createClass({
  mixins: [Reflux.connect(Settings, "settings"), Reflux.connect(Sounds, "sounds")],
  renderIconMultiple() {
    let multiToggle = Sounds.getMultipleStatus();
    return (
      <TouchableOpacity onPress={soundActions.toggleMultiple}>
        <Icon
          name={"material|" + (multiToggle === 2 ? "play" : "pause")}
          size={30}
          color="#fff"
          style={[styles.multiple, !multiToggle && styles.multipleHide]}
        />
      </TouchableOpacity>
    );
  },
  render() {
    return (
      <View style={[styles.header, {backgroundColor: this.state.settings.color}]}>
        <TouchableOpacity onPress={this.props.toggleMenu}>
          <Icon
            name="material|menu"
            size={30}
            color="#fff"
            style={[styles.menu, this.state.settings.menu && styles.menuActive]}
          />
        </TouchableOpacity>
        <View style={styles.title}>
          <Image style={styles.logo} source={require("image!kakapo")}/>
          <Text style={styles.headerText}>{this.props.title}</Text>
        </View>
        {this.renderIconMultiple()}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    height: process.env.os === "ios" ? 80 : 55,
    paddingTop: process.env.os === "ios" ? 25 : 0
  },
  menu: {
    height: 30,
    marginLeft: 15,
    width: 30
  },
  multiple: {
    height: 30,
    marginRight: 15,
    width: 30
  },
  multipleHide: {
    opacity: 0
  },
  title: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  logo: {
    height: 38,
    marginRight: 7,
    width: 38
  },
  headerText: {
    alignSelf: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  }
});
