import React, { Component, TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import Color from 'color';
import { mdl } from 'react-native-material-kit';
import { soundActions, settingActions } from '../actions';

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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start'
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
    fontFamily: 'SFUIText-Regular',
    fontSize: 18,
    marginLeft: 14,
    textAlign: 'left',
    marginTop: 6
  },
  titlePlaying: {
    color: '#fff'
  }
});

class SoundItem extends Component {
  componentWillMount() {
    this.changeVolumeThrottled = throttle(this.changeVolume, 200);
  }

  componentDidMount() {
    this.updateVolumeTrack();
  }

  componentDidUpdate() {
    this.updateVolumeTrack();
  }

  togglePlay = () => {
    this.props.soundActions.soundsPlay(this.props);
  }

  changeVolume = (vol) => this.props.soundActions.soundsVolume(this.props, vol);

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

const mapStateToProps = state => ({
  themes: state.themes,
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  soundActions: bindActionCreators(soundActions, dispatch),
  settingActions: bindActionCreators(settingActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SoundItem);
