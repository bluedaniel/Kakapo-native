import React, { NativeModules, LinkingIOS, ScrollView, ToastAndroid, AlertIOS, TouchableOpacity, StyleSheet, Text, View, Platform, Component } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import { Icon } from 'react-native-icons';
import Color from 'color';
import { settingActions } from '../actions';
import ColorPicker from './colorPicker';

const { KDSocialShare } = NativeModules;

const shareDataiOS = {
  text: 'Kakapo on the App Store',
  link: 'https://itunes.apple.com/us/app/kakapo/id1046673139',
  imagelink: 'http://a2.mzstatic.com/eu/r30/Purple3/v4/12/ab/2a/12ab2a01-3a3c-9482-b8df-ab38ad281165/icon175x175.png'
};
const shareDataAndroid = Object.assign({}, shareDataiOS, {
  text: 'Kakapo on the Play Store',
  link: 'https://play.google.com/store/apps/details?id=com.kakaponative'
});

const githubRepo = 'https://github.com/bluedaniel/Kakapo-native';

class Settings extends Component {
  tweet() {
    KDSocialShare.tweet(shareDataiOS,
      res => res === 'not_available' ? AlertIOS.alert('Twitter not available', 'Setup Twitter in Settings > Twitter') : null);
  }

  facebook() {
    KDSocialShare.shareOnFacebook(shareDataiOS,
      res => res === 'not_available' ? AlertIOS.alert('Facebook not available', 'Setup Facebook in Settings > Facebook') : null);
  }

  shareIntent() {
    KDSocialShare.shareIntent(shareDataAndroid,
      res => res === 'not_available' ? ToastAndroid.show('Sharing not available :(', ToastAndroid.SHORT) : null);
  }

  openURL() {
    if (Platform.OS === 'ios') {
      LinkingIOS.openURL(githubRepo);
    } else {
      KDSocialShare.openURL(githubRepo);
    }
  }

  renderShareios() {
    return (
      <View>
        <TouchableOpacity style={styles.optWrap} onPress={this.facebook}>
          <Icon
            name="material|facebook"
            size={30}
            color="#fff"
            style={styles.optWrapIcon}
          />
          <Text style={styles.opt}>Share on Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optWrap} onPress={this.tweet}>
          <Icon
            name="material|twitter"
            size={30}
            color="#fff"
            style={styles.optWrapIcon}
          />
          <Text style={styles.opt}>Share on Twitter</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderShareAndroid() {
    return (
      <View>
        <TouchableOpacity style={styles.optWrap} onPress={this.shareIntent}>
          <Icon
            name="material|share"
            size={30}
            color="#fff"
            style={styles.optWrapIcon}
          />
          <Text style={styles.opt}>Share Kakapo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={[
          styles.settings,
          { backgroundColor: Color(this.props.themes.get('palette').first()).lighten(0.15).hexString() }
        ]}
      >
        <Text style={[ styles.header, styles.headerFirst ]}>Settings</Text>
        <Text style={styles.opt}>Color</Text>
        <ColorPicker color={this.props.themes.get('palette').first()}/>
        <Text style={styles.header}>Extra</Text>
        {Platform.OS === 'ios' ? this.renderShareios() : this.renderShareAndroid()}
        <TouchableOpacity
          style={styles.optWrap}
          onPress={this.openURL}
        >
          <Icon
            name="material|github"
            size={30}
            color="#fff"
            style={styles.optWrapIcon}
          />
          <Text style={styles.opt}>Fork me on GitHub!</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 20,
    paddingLeft: 25,
    paddingRight: 20
  },
  header: {
    fontFamily: 'SFUIDisplay-Bold',
    color: '#fff',
    fontSize: 22,
    marginBottom: 13,
    marginTop: 30
  },
  headerFirst: {
    marginTop: 0
  },
  optWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  optWrapIcon: {
    height: 34,
    left: -5,
    marginTop: -8,
    position: 'relative',
    width: 34
  },
  opt: {
    fontFamily: 'SFUIDisplay-Medium',
    color: '#fff',
    fontSize: 16,
    marginTop: 7,
    marginBottom: 13
  }
});

const mapStateToProps = state => ({
  themes: state.themes
});

const mapDispatchToProps = dispatch => ({
  settingActions: bindActionCreators(settingActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
