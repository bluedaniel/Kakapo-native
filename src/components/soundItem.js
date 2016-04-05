import React, { TouchableOpacity, Image, Text, View } from 'react-native';
import Color from 'color';
import Slider from 'react-native-slider';
import { soundActions } from '../actions';
import styles from '../styles/soundItem';

export default ({ themes, sound, dispatch }) => {
  const changeVolume = (vol) => dispatch(soundActions.soundsVolume(sound, vol));

  const togglePlay = () => dispatch(soundActions.soundsPlay(sound));

  const { img, playing, name, volume } = sound;
  return (
    <View style={[ styles.container, playing && {
      backgroundColor: new Color(themes.get('palette').first()).lighten(0.15).hexString()
    } ]}
    >
      <TouchableOpacity onPress={togglePlay}>
        <Image style={styles.img} source={{ uri: `${playing ?
          'light' : 'dark'}_${img}`, isStatic: true }}
        />
      </TouchableOpacity>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={togglePlay}>
          <Text style={[ styles.title, playing && styles.titlePlaying ]}>
            {name}
          </Text>
        </TouchableOpacity>
        <Slider
          trackStyle={[ styles.track, playing && {
            backgroundColor: new Color(themes.get('palette').first()).lighten(0.50).hexString()
          } ]}
          thumbStyle={[ styles.thumb, playing && {
            backgroundColor: new Color(themes.get('palette').first()).lighten(0.80).hexString(),
            borderColor: 'white'
          } ]}
          minimumTrackTintColor={playing ? 'white' : '#efefef'}
          value={volume}
          onSlidingComplete={changeVolume}
        />
      </View>
    </View>
  );
};
