import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

export default StyleSheet.create({
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
