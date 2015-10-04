import React from "react-native";
import Reflux from "reflux";
import {Loading, SoundItem} from "./";
import {Sounds} from "../stores";

const {ListView, View} = React;

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
    />
  },
  render() {
    return this.state.loaded ? this.renderList() : <Loading loaded={this.props.loaded}/>;
  }
});
