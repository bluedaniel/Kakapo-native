import React from "react-native";
import Reflux from "reflux";
import {Loading, SoundItem} from "./";
import {Sounds} from "../stores";

const {ListView, StyleSheet, View} = React;

export default React.createClass({
  mixins: [Reflux.connect(Sounds, "sounds")],
  componentDidMount() {
    Sounds.getSounds();
  },
  getInitialState() {
    return { loaded: true };
  },
  renderList() {
    return <ListView
      dataSource={this.state.sounds}
      renderRow={sound => <SoundItem {...sound}/>}
      style={styles.listView}
    />
  },
  render() {
    return this.state.loaded ? this.renderList() : <Loading loaded={this.props.loaded}/>;
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listView: {
    backgroundColor: "#F5FCFF"
  }
});
