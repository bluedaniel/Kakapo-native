import React, { Component, ListView } from 'react-native';
import { connect } from 'react-redux/native';
import Loading from './loading';
import SoundItem from './soundItem';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

class SoundList extends Component {
  state = { loaded: true }

  renderList() {
    return (<ListView
      dataSource={ds.cloneWithRows(this.props.sounds.toArray())}
      renderRow={sound => <SoundItem {...sound}/>}
    />);
  }

  render() {
    return this.state.loaded ? this.renderList() : <Loading loaded={this.props.loaded}/>;
  }
}

const mapStateToProps = state => ({
  sounds: state.sounds
});

export default connect(mapStateToProps)(SoundList);
