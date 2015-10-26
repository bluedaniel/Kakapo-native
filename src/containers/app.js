import React from "react-native";
import Drawer from "react-native-drawer";
import {Header, SoundList, Settings} from "../components";
import {settingActions} from "../actions";
import {Settings as SettingsStore} from "../stores";

const {StyleSheet, View} = React;

export default React.createClass({
  getInitialState() {
    return { title: "Kakapo" };
  },
  componentDidMount() {
    SettingsStore.getTheme();
  },
  render() {
    return (
      <Drawer
        content={<Settings/>}
        onClose={() => settingActions.menuToggle(false)}
        onOpen={() => settingActions.menuToggle(true)}
        openDrawerOffset={100}
        panCloseMask={1}
        ref="drawer"
        styles={{main: {
          shadowColor: "#000",
          shadowOpacity: 0.4,
          shadowRadius: 10
        }}}
        tweenHandler={Drawer.tweenPresets.parallax}
        type="static"
      >
        <View style={styles.container}>
          <Header title={this.state.title} toggleMenu={() => this.refs.drawer.toggle()}/>
          <SoundList/>
        </View>
      </Drawer>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
