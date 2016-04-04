import React, { Component, StyleSheet, View, StatusBar, Platform } from 'react-native';
import Drawer from 'react-native-drawer';
import { connect } from 'react-redux';
import { Header, Settings, SoundList, Loading } from '../components';
import { settingActions, soundActions, themeActions } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class App extends Component {
  componentDidMount() {
    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content');
    this.props.dispatch(soundActions.soundsInit());
    this.props.dispatch(themeActions.getTheme());
  }

  render() {
    const { sounds, themes, dispatch } = this.props;

    if (!themes.count()) return (<Loading />);

    return (
      <Drawer
        content={<Settings themeActions={this.props.themeActions} />}
        onClose={() => dispatch(settingActions.menuToggle(false))}
        onOpen={() => dispatch(settingActions.menuToggle(true))}
        openDrawerOffset={100}
        captureGestures
        negotiatePan
        acceptDoubleTap
        ref="drawer"
        styles={{ main: {
          shadowColor: '#000',
          shadowOpacity: 0.4,
          shadowRadius: 10
        } }}
        tweenHandler={Drawer.tweenPresets.parallax}
        type="static"
      >
        <View style={styles.container}>
          <Header { ...{ themes, sounds, dispatch, toggleMenu: () => this.refs.drawer.toggle() }} />
          <SoundList sounds={this.props.sounds} />
        </View>
      </Drawer>
    );
  }
}

export default connect(state => ({
  themes: state.themes,
  sounds: state.sounds
}))(App);
