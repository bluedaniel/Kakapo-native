import React, { StyleSheet, View, StatusBar, Platform } from 'react-native';
import Drawer from 'react-native-drawer';
import { connect } from 'react-redux';
import { Header, Settings, SoundList, Loading } from '../components';
import { settingActions, soundActions, themeActions } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const App = ({ sounds, themes, dispatch }) => {
  if (!themes.count() || !sounds.count()) {
    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content');
    if (!sounds.count()) dispatch(soundActions.soundsInit());
    if (!themes.count()) dispatch(themeActions.getTheme());
    return (<Loading />);
  }

  return (
    <Drawer
      content={<Settings { ...{ themes, dispatch }} />}
      onClose={() => dispatch(settingActions.menuToggle(false))}
      onOpen={() => dispatch(settingActions.menuToggle(true))}
      openDrawerOffset={100}
      captureGestures
      negotiatePan
      acceptDoubleTap
      styles={{ main: {
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 10
      } }}
      tweenHandler={Drawer.tweenPresets.parallax}
      type="static"
    >
      <View style={styles.container}>
        <Header { ...{ themes, sounds, dispatch }} />
        <SoundList { ...{ themes, sounds, dispatch }} />
      </View>
    </Drawer>
  );
};

export default connect(state => ({
  themes: state.themes,
  sounds: state.sounds
}))(App);
