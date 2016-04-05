import React, {
  NativeModules, Linking, ScrollView, ToastAndroid, AlertIOS,
  TouchableOpacity, Text, View, Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from 'color';
import ColorPicker from './colorPicker';
import styles from '../styles/settings';

const { KDSocialShare } = NativeModules;

const shareiOS = {
  text: 'Kakapo on the App Store',
  link: 'https://itunes.apple.com/us/app/kakapo/id1046673139',
  imagelink: 'http://a2.mzstatic.com/eu/r30/Purple3/v4/12/ab/2a/12ab2a01-3a3c-9482-b8df-ab38ad281165/icon175x175.png'
};
const shareAndroid = Object.assign({}, shareiOS, {
  text: 'Kakapo on the Play Store',
  link: 'https://play.google.com/store/apps/details?id=com.kakaponative'
});

const githubRepo = 'https://github.com/bluedaniel/Kakapo-native';

export default ({ themes, dispatch }) => {
  const tweet = () => KDSocialShare.tweet(shareiOS, res => res === 'not_available' ?
      AlertIOS.alert('Twitter not available', 'Setup Twitter in Settings > Twitter') : null);

  const facebook = () => KDSocialShare.shareOnFacebook(shareiOS, res => res === 'not_available' ?
    AlertIOS.alert('Facebook not available', 'Setup Facebook in Settings > Facebook') : null);

  const shareIntent = () => KDSocialShare.shareIntent(shareAndroid, res => res === 'not_available' ?
    ToastAndroid.show('Sharing not available :(', ToastAndroid.SHORT) : null);

  const openURL = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(githubRepo);
    } else {
      KDSocialShare.openURL(githubRepo);
    }
  };

  const renderShareios = () => (
    <View>
      <TouchableOpacity style={styles.optWrap} onPress={facebook}>
        <Icon
          name="share"
          size={30}
          color="#fff"
          style={styles.optWrapIcon}
        />
        <Text style={styles.opt}>Share on Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optWrap} onPress={tweet}>
        <Icon
          name="share"
          size={30}
          color="#fff"
          style={styles.optWrapIcon}
        />
        <Text style={styles.opt}>Share on Twitter</Text>
      </TouchableOpacity>
    </View>
  );

  const renderShareAndroid = () => (
    <View>
      <TouchableOpacity style={styles.optWrap} onPress={shareIntent}>
        <Icon
          name="share"
          size={30}
          color="#fff"
          style={styles.optWrapIcon}
        />
      <Text style={styles.opt}>Share Kakapo</Text>
      </TouchableOpacity>
    </View>
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
      {Platform.OS === 'ios' ? renderShareios() : renderShareAndroid()}
      <TouchableOpacity
        style={styles.optWrap}
        onPress={openURL}
      >
        <Icon
          name="github"
          size={30}
          color="#fff"
          style={styles.optWrapIcon}
        />
        <Text style={styles.opt}>Fork on GitHub!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
