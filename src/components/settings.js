import React, { Linking, ScrollView, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Color from 'color';
import ColorPicker from './colorPicker';
import styles from '../styles/settings';

const shareText = encodeURI('Kakapo Apps - Ambient sound mixer for relaxation or productivity');
const shareLink = 'http://kakapo.co/app.html';
const githubLink = 'https://github.com/bluedaniel/Kakapo-native';
const facebookLink = `http://www.facebook.com/sharer/sharer.php?u=${shareLink}&t=${shareText}`;
const twitterLink = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}`;

export default ({ themes, dispatch }) => {
  const share = (link, icon, text) => (
    <TouchableOpacity style={styles.optWrap} onPress={() => Linking.openURL(link)}>
      <Icon
        name={icon}
        size={30}
        color="#fff"
        style={styles.optWrapIcon}
      />
      <Text style={styles.opt}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      automaticallyAdjustContentInsets={false}
      style={[
        styles.settings, { backgroundColor:
          new Color(themes.get('palette').first()).lighten(0.15).hexString()
        } ]}
    >
      <Text style={[ styles.header, styles.headerFirst ]}>Settings</Text>
      <Text style={styles.opt}>Color</Text>
      <ColorPicker { ...{ dispatch, color: themes.get('palette').first() }} />
      <Text style={styles.header}>Extra</Text>
      {share(facebookLink, 'sc-facebook', 'Share on Facebook')}
      {share(twitterLink, 'sc-twitter', 'Share on Twitter')}
      {share(githubLink, 'sc-github', 'Fork on GitHub!')}
    </ScrollView>
  );
};
