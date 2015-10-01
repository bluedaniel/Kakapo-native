import React from "react-native";
import {Loading, SoundItem} from "./components";
import SoundsJson from "./data/sounds.json";

const {AsyncStorage, ListView, StyleSheet, View} = React;
const STORAGE_KEY = "@AsyncStorageSounds:key";

let App = React.createClass({
  componentDidMount() {
    this.loadInitialState().done();
  },
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };
  },
  async loadInitialState() {
    var sounds = await AsyncStorage.getItem(STORAGE_KEY);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(sounds || SoundsJson),
      loaded: true
    });
  },
  // async onValueChange(selectedValue) {
  //   this.setState({selectedValue});
  //   await AsyncStorage.setItem(STORAGE_KEY, selectedValue);
  // },
  render() {
    if (!this.state.loaded) return <Loading/>;
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={sound => <SoundItem {...sound}/>}
        style={styles.listView}
      />
    );
  }
});

const styles = StyleSheet.create({
  listView: {
    paddingTop: 20,
    backgroundColor: "#F5FCFF"
  }
});

React.AppRegistry.registerComponent("kakapoNative", () => App);
