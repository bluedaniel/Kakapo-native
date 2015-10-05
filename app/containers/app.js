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
        ref="drawer"
        type="static"
        content={<Settings/>}
        openDrawerOffset={100}
        onOpen={() => StatusBarIOS.setHidden(true, "slide")}
        onClose={() => StatusBarIOS.setHidden(false, "slide")}
        styles={{main: {shadowColor: "#000000", shadowOpacity: 0.4, shadowRadius: 3}}}
        tweenHandler={Drawer.tweenPresets.parallax}
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
