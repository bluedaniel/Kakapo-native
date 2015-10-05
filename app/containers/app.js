import React from "react-native";
import Drawer from "react-native-drawer";
import {Header, SoundList, Settings} from "../components";

const {StatusBarIOS, StyleSheet, View} = React;

export default React.createClass({
  componentDidMount() {
    StatusBarIOS.setStyle("light-content");
  },
  getInitialState() {
    return { title: "Kakapo" };
  },
  openControlPanel() {
    this.refs.drawer.open();
  },
  closeControlPanel() {
    this.refs.drawer.close();
  },
  render() {
    return (
      <Drawer
        content={<Settings/>}
        onClose={() => StatusBarIOS.setHidden(false, "slide")}
        onOpen={() => StatusBarIOS.setHidden(true, "slide")}
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
          <Header title={this.state.title}/>
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
