import React from "react-native";
const {ActivityIndicatorIOS, StyleSheet, View} = React;

export default React.createClass({
  render() {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicatorIOS
          animating={!this.props.loaded}
          style={styles.activityIndicator}
          size="large"
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  activityIndicator: {
    height: 80,
    width: 80
  }
});
