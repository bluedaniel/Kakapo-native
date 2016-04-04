import React, { Component, TouchableOpacity, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import Color from 'color';
import { mdl } from 'react-native-material-kit';
import { soundActions } from '../actions';
import styles from '../styles/soundItem';

const SliderWithValue = mdl.Slider.slider()
  .withStyle({
    flex: 1,
    marginRight: 30,
    marginBottom: 6,
    marginLeft: 0
  })
  .withMin(0)
  .withMax(1)
  .build();

class SoundItem extends Component {
  componentDidMount() {
    this.changeVolumeThrottled = throttle(this.changeVolume, 200);
    this.updateVolumeTrack();
  }

  componentDidUpdate() {
    // this.updateVolumeTrack();
  }

  togglePlay = () => {
    this.props.dispatch(soundActions.soundsPlay(this.props));
  }

  changeVolume = (vol) => this.props.dispatch(soundActions.soundsVolume(this.props, vol));

  updateVolumeTrack = () => {
    this.refs.sliderWithValue.value = this.props.volume;
  }

  render() {
    const { img, themes, playing, name } = this.props;
    return (
      <View style={[ styles.container, playing && {
        backgroundColor: new Color(themes.get('palette').first()).lighten(0.15).hexString()
      } ]}
      >
        <TouchableOpacity onPress={this.togglePlay}>
          <Image style={styles.img} source={{ uri: `${playing ?
            'light' : 'dark'}_${img}`, isStatic: true }}
          />
        </TouchableOpacity>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={this.togglePlay}>
            <Text style={[ styles.title, playing && styles.titlePlaying ]}>
              {name}
            </Text>
          </TouchableOpacity>
          <SliderWithValue
            ref="sliderWithValue"
            upperTrackColor={playing ? '#fff' : '#f9f9f9'}
            lowerTrackColor={playing ? '#fff' : '#f9f9f9'}
            onChange={vol => this.changeVolumeThrottled(vol)}
            trackSize={4}
          />
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  themes: state.themes,
  settings: state.settings
}))(SoundItem);
