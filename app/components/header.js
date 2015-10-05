import React from "react-native";

const {Image, StyleSheet, Text, View} = React;

export default React.createClass({
  render() {
    return (
      <View style={styles.header}>
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
    backgroundColor: "#532F93",
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
