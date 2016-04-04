import React, { TouchableOpacity, StyleSheet, View } from 'react-native';
import Dimensions from 'Dimensions';
import { themeActions } from '../actions';
import Swatches from '../utils/swatches';

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
    marginRight: Dimensions.get('window').width === 320 ? 2 : 6
  },
  colorSelected: {
    borderWidth: 2,
    borderColor: '#fff'
  }
});

export default ({ color, dispatch }) => {
  const changeColor = (hex) => dispatch(themeActions.themesChange(hex, 0));

  return (
    <View style={styles.colorPicker}>
      {Swatches.all().map(swatch =>
        <TouchableOpacity key={swatch} onPress={() => changeColor(swatch)}>
          <View style={[
            styles.swatches, {
              backgroundColor: swatch
            },
            swatch === color && styles.colorSelected
          ]}
          />
        </TouchableOpacity>)}
    </View>
  );
};
