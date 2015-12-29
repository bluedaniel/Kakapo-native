import React, { Component, TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import throttle from 'lodash/function/throttle';
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

class SoundItem extends Component {
  componentDidUpdate() {
    this.updateVolumeTrack();
  }

  componentDidMount() {
    this.updateVolumeTrack();
  }

  componentWillMount() {
    this.changeVolumeThrottled = throttle(this.changeVolume, 200);
  }

  togglePlay = () => {
    this.props.soundActions.soundsPlay(this.props);
  }

  changeVolume = (vol) => this.props.soundActions.soundsVolume(this.props, vol);

  updateVolumeTrack = () => this.refs.sliderWithValue.value = this.props.volume;

  render() {
    return (
      <View style={[ styles.container, this.props.playing && { backgroundColor: Color(this.props.themes.get('palette').first()).lighten(0.15).hexString() } ]}>
        <TouchableOpacity onPress={this.togglePlay}>
          <Image style={styles.img} source={{ uri: (this.props.playing ? 'light' : 'dark') + `_${this.props.img}`, isStatic: true }}/>
        </TouchableOpacity>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={this.togglePlay}>
          <Text style={[ styles.title, this.props.playing && styles.titlePlaying ]}>
            {this.props.name}
          </Text>
          </TouchableOpacity>
          <SliderWithValue
            ref="sliderWithValue"
            upperTrackColor={this.props.playing ? '#fff' : '#f9f9f9'}
            lowerTrackColor={this.props.playing ? '#fff' : '#f9f9f9'}
            onChange={vol => this.changeVolumeThrottled(vol)}
            trackSize={4}
          />
        </View>
      </View>
    );
  }
}

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

const mapStateToProps = state => ({
  themes: state.themes,
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  soundActions: bindActionCreators(soundActions, dispatch),
  settingActions: bindActionCreators(settingActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SoundItem);
