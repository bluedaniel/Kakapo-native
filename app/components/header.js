import React from "react-native";
import Reflux from "reflux";
import {Icon} from "react-native-icons";
import {Settings} from "../stores";
import {settingActions} from "../actions";

const {TouchableOpacity, Image, StyleSheet, Text, View} = React;

export default React.createClass({
  mixins: [Reflux.connect(Settings, "settings")],
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
  title: {
    flex: 1,
  },
  logo: {
    width: 38,
    height: 38,
    position: "relative",
    left: 83,
    top: 11
  },
  headerText: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 20,
    color: "white",
    top: -19,
    position: "relative"
  }
});
