import React from "react-native";
import {soundActions} from "../actions";
const {TouchableOpacity, Image, StyleSheet, Text, View} = React;

export default React.createClass({
  togglePlay() {
    soundActions.togglePlayPause(this.props);
  },
  render() {
    return (
      <TouchableOpacity onPress={this.togglePlay}>
        <View style={[styles.container, this.props.playing && styles.containerPlaying]}>
          <Image style={styles.img} source={{uri: this.props.img}}/>
          <View style={styles.rightContainer}>
            <Text style={[styles.title, this.props.playing && styles.titlePlaying]}>
              {this.props.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  containerPlaying: {
    backgroundColor: "#6538B2"
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
    fontSize: 18,
    marginBottom: 8,
    marginLeft: 8,
    textAlign: "left"
  },
  titlePlaying: {
    color: "#fff"
  }
});
