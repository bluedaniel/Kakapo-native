import React, { Component, StyleSheet, View, StatusBar, Platform } from 'react-native';
import Drawer from 'react-native-drawer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header, Settings, SoundList, Loading } from '../components';
import { settingActions, soundActions, themeActions } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class App extends Component {

  state = { title: 'Kakapo' }

  componentDidMount() {
    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content');
    this.props.soundActions.soundsInit();
    this.props.themeActions.getTheme();
  }

  render() {
    if (!this.props.themes.count()) {
      return (<Loading />);
    }
    return (
      <Drawer
        content={<Settings />}
        onClose={() => this.props.settingActions.menuToggle(false)}
        onOpen={() => this.props.settingActions.menuToggle(true)}
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
          <Header title={this.state.title} toggleMenu={() => this.refs.drawer.toggle()} />
          <SoundList />
        </View>
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  themes: state.themes
});

const mapDispatchToProps = dispatch => ({
  soundActions: bindActionCreators(soundActions, dispatch),
  settingActions: bindActionCreators(settingActions, dispatch),
  themeActions: bindActionCreators(themeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
