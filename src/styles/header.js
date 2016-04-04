import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 80 : 55,
    paddingTop: Platform.OS === 'ios' ? 25 : 0
  },
  menu: {
    height: 30,
    marginLeft: 15,
    width: 30
  },
  multiple: {
    height: 30,
    marginRight: 15,
    width: 30
  },
  multipleHide: {
    opacity: 0
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logo: {
    height: 38,
    marginRight: 7,
    width: 38
  },
  headerText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
