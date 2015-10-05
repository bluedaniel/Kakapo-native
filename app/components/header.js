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
    if (!multiToggle) return;
    return (
      <TouchableOpacity onPress={soundActions.toggleMultiple}>
        <Icon
          name={"material|" + (multiToggle === 2 ? "play" : "pause")}
          size={30}
          color="#fff"
          style={styles.multiple}
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
          <Image style={styles.logo} source={{uri: "http://www.kakapo.co/icons/social/kakapo.png"}}/>
          <Text style={styles.headerText}>{this.props.title}</Text>
        </View>
        {this.renderIconMultiple()}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 80,
    paddingTop: 25,
    alignItems: "center"
  },
  menu: {
    width: 30,
    height: 30,
    marginLeft: 15
  },
  menuActive: {
  },
  multiple: {
    width: 30,
    height: 30,
    marginRight: 15
  },
  multipleHide: {
    opacity: 0
  },
  title: {
    flex: 1,
  },
  logo: {
    width: 38,
    height: 38,
    position: "relative",
    left: 80,
    top: 11
  },
  headerText: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 20,
    color: "white",
    top: -19,
    left: 19,
    position: "relative"
  }
});
