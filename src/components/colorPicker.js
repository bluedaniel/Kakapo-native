import React, { Component, NativeModules, TouchableOpacity, StyleSheet, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Dimensions from 'Dimensions';
import { themeActions } from '../actions';
import Swatches from '../utils/swatches';

const { KDSocialShare } = NativeModules;

class ColorPicker extends Component {
  changeColor = (hex) => this.props.themeActions.themesChange(hex, 0)

  render() {
    return (
      <View style={styles.colorPicker}>
        {Swatches.all().map(swatch => <TouchableOpacity key={swatch} onPress={() => this.changeColor(swatch)}>
          <View style={[
            styles.swatches, {
              backgroundColor: swatch
            },
            swatch === this.props.color && styles.colorSelected
          ]}/>
        </TouchableOpacity>, this)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  colorPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  swatches: {
    width: 38,
    height: 38,
    marginBottom: 6,
    marginRight: Dimensions.get('window').width === 320
      ? 2
      : 6
  },
  colorSelected: {
    borderWidth: 2,
    borderColor: '#fff'
  }
});

const mapDispatchToProps = dispatch => ({
  themeActions: bindActionCreators(themeActions, dispatch)
});

export default connect(() => ({}), mapDispatchToProps)(ColorPicker);
