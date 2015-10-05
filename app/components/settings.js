import React from "react-native";
import Reflux from "reflux";
import {KDSocialShare} from "NativeModules";
import Color from "color";
import {Settings} from "../stores";
import {settingActions} from "../actions";
import {ColorPicker} from "./";

const {AlertIOS, Image, TouchableOpacity, StyleSheet, Text, View} = React;

export default React.createClass({
  mixins: [Reflux.connect(Settings, "settings")],
  tweet() {
    KDSocialShare.tweet({
      "text": "Kakapo",
      "link": "https://kakapo.co",
      "imagelink": "http://www.kakapo.co/icons/social/kakapo.png"
    },
    res => {
      if (res === "not_available") AlertIOS.alert("Twitter not available", "Setup Twitter in Settings > Twitter");
    });
  },
  facebook() {
    KDSocialShare.shareOnFacebook({
      "text": "Kakapo",
      "link": "https://kakapo.co",
      "imagelink": "http://www.kakapo.co/icons/social/kakapo.png"
    },
    res => {
      if (res === "not_available") AlertIOS.alert("Facebook not available", "Setup Facebook in Settings > Facebook");
    });
  },
  render() {
    return (
      <View style={[styles.settings, {backgroundColor: Color(this.state.settings.color).lighten(0.15).hexString()}]}>
        <Text style={[styles.header, styles.headerFirst]}>Settings</Text>
        <TouchableOpacity>
          <Text style={styles.opt}>Language</Text>
        </TouchableOpacity>

        <Text style={styles.opt}>Color</Text>
        <ColorPicker/>

        <Text style={styles.header}>Share</Text>
        <TouchableOpacity onPress={this.facebook}>
          <Text style={styles.opt}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.tweet}>
          <Text style={styles.opt}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.opt}>Fork me on GitHub!</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
    paddingLeft: 25,
    paddingRight: 20,
    marginRight: 100
  },
  header: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 13,
    marginTop: 30
  },
  headerFirst: {
    marginTop: 0
  },
  opt: {
    color: "#fff",
    fontSize: 16,
    marginTop: 7,
    marginBottom: 13
  }
});
