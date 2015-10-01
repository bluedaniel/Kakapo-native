import React from "react-native";
const {StyleSheet, Text, View} = React;

export default React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Loading sounds...
        </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
