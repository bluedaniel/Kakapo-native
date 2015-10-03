import React from "react-native";
import Reflux from "reflux";
import {Loading, SoundItem} from "./";
import {Sounds} from "../stores";

const {ListView, StyleSheet, View} = React;

export default React.createClass({
  componentDidMount() {
    Sounds.getSounds().then(s => this.setState({
      dataSource: this.state.dataSource.cloneWithRows(s),
      loaded: true
    }));
  },
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };
  },
  renderList() {
    return <ListView
      dataSource={this.state.dataSource}
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
    paddingTop: 20,
    backgroundColor: "#F5FCFF"
  }
});
