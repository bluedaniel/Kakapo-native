import React from "react-native";
const {StyleSheet, Text, View} = React;

export default React.createClass({
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{this.props.title}</Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  header: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3F51B5",
    flexDirection: "column",
    paddingTop: 25
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
  }
});
