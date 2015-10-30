import React from "react-native";
import Reflux from "reflux";
import throttle from "lodash/function/throttle";
import Color from "color";
import {soundActions} from "../actions";
import {Settings} from "../stores";

const {TouchableOpacity, SliderIOS, Image, StyleSheet, Text, View} = React;

export default React.createClass({
  mixins: [Reflux.connect(Settings, "settings")],
  componentWillMount() {
    this.changeVolumeThrottled = throttle(this.changeVolume, 200);
  },
  togglePlay() {
    soundActions.togglePlayPause(this.props, true);
  },
  changeVolume(vol, trigger) {
    soundActions.changeVolume(this.props, vol, trigger);
  },
  renderSlider() {
    if (!this.props.playing) return;
    return <SliderIOS
      style={styles.slider}
      minimumTrackTintColor="#fff"
      maximumTrackTintColor="#fff"
      onValueChange={vol => this.changeVolumeThrottled(vol, false)}
      onSlidingComplete={vol => this.changeVolume(vol, true)}
      value={this.props.volume}
    />;
  },
  render() {
    return (
      <View style={[styles.container, this.props.playing && {backgroundColor: Color(this.state.settings.color).lighten(0.15).hexString()}]}>
        <TouchableOpacity onPress={this.togglePlay}>
          <Image style={styles.img} source={{
            uri: (this.props.playing ? "light-" : "dark-") + this.props.img
          }}/>
        </TouchableOpacity>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={this.togglePlay}>
          <Text style={[styles.title, this.props.playing && styles.titlePlaying]}>
            {this.props.name}
          </Text>
          </TouchableOpacity>
          {this.renderSlider()}
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  img: {
    width: 48,
    height: 48,
    margin: 15
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontFamily: "SFUIText-Regular",
    fontSize: 18,
    marginLeft: 8,
    textAlign: "left"
  },
  titlePlaying: {
    color: "#fff",
    marginBottom: 10,
    marginTop: 6
  },
  slider: {
    flex: 1,
    height: 15,
    marginLeft: 8,
    marginRight: 30,
    marginBottom: 15
  }
});
