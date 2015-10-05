import React from "react-native";
import Reflux from "reflux";
import {Settings} from "../stores";

const {Image, StyleSheet, Text, View} = React;

export default React.createClass({
  mixins: [Reflux.connect(Settings, "settings")],
  render() {
    return (
      <View style={[styles.header, {backgroundColor: this.state.settings.color}]}>
        <Image style={styles.logo} source={{uri: "http://www.kakapo.co/icons/social/kakapo.png"}}/>
        <Text style={styles.headerText}>{this.props.title}</Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    paddingTop: 25
  },
  logo: {
    width: 38,
    height: 38,
    position: "relative",
    left: -10
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    position: "relative",
    left: -2
  }
});
