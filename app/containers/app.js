import React from "react-native";
import {Header, SoundList} from "../components";

const {StyleSheet, View} = React;

export default React.createClass({
  getInitialState() {
    return { title: "Kakapo" };
  },
  render() {
    return (
      <View style={styles.container}>
        <Header title={this.state.title}/>
        <SoundList/>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
