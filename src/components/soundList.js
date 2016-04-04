import React, { ListView } from 'react-native';
import Loading from './loading';
import SoundItem from './soundItem';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

export default ({ sounds }) => (
  sounds ?
    <ListView
      dataSource={ds.cloneWithRows(sounds.toArray())}
      renderRow={sound => <SoundItem {...sound} />}
    />
  : <Loading loaded />
);
