import React, { ListView } from 'react-native';
import SoundItem from './soundItem';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

export default ({ themes, sounds, dispatch }) => (
  <ListView dataSource={ds.cloneWithRows(sounds.toArray())}
    renderRow={sound => <SoundItem { ...{ sound, themes, dispatch }} />}
  />
);
