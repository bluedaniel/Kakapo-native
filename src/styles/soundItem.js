import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
