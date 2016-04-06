import React, { TouchableOpacity, Image, Text, View, Animated } from 'react-native';
import Rx from 'rxjs';
import Color from 'color';
import Slider from 'react-native-slider';
import { soundActions } from '../actions';
import styles from '../styles/soundItem';

const subject = new Rx.Subject()
.debounceTime(33)
.distinctUntilChanged();

subject.subscribe({
  next: ({ dispatch, sound, vol }) => dispatch(soundActions.soundsVolume(sound, vol))
});

export default ({ themes, sound, dispatch }) => {
  const { img, playing, name, volume } = sound;

  const styleAnim = new Animated.Value(playing ? 150 : 0);

  const togglePlay = () => {
    Animated.timing(styleAnim, { toValue: !playing ? 150 : 0, duration: 250 }).start();
    setTimeout(() => dispatch(soundActions.soundsPlay(sound)), 250);
  };

  const bg = new Color(themes.get('palette').first());
  const interpolateValues = {
    inputRange: [ 0, 150 ],
    outputRange: [ 'rgba(0, 0, 0, 1)', 'rgba(255, 255, 255, 1)' ]
  };
  const txtColor = styleAnim.interpolate(interpolateValues);
  const bgColor = styleAnim.interpolate({
    ...interpolateValues,
    outputRange: [ bg.alpha(0).rgbaString(), bg.alpha(1).rgbaString() ]
  });

  return (
    <Animated.View style={[ styles.container, { backgroundColor: bgColor } ]}>
      <TouchableOpacity onPress={togglePlay}>
        <Image style={styles.img} source={{ uri: `${playing ?
          'light' : 'dark'}_${img}`, isStatic: true }}
        />
      </TouchableOpacity>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={togglePlay}>
          <Animated.Text style={[ styles.title, { color: txtColor } ]}>
            {name}
          </Animated.Text>
        </TouchableOpacity>
        <Slider
          trackStyle={[ styles.track ]}
          thumbStyle={[ styles.thumb, {
            borderColor: '#efefef'
          } ]}
          minimumTrackTintColor={'#efefef'}
          value={volume}
          onValueChange={(vol) => subject.next({ dispatch, sound, vol: parseFloat(vol) })}
        />
      </View>
    </Animated.View>
  );
};
