import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 40,
    paddingBottom: 13,
    paddingTop: 13
  },
  img: {
    width: 48,
    height: 48,
    marginRight: 30
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 18,
    textAlign: 'left'
  },
  track: {
    height: 4,
    borderRadius: 2,
    paddingTop: 5,
    backgroundColor: '#efefef'
  },
  thumb: {
    width: 25,
    height: 25,
    borderRadius: 30 / 2,
    borderWidth: 2,
    borderColor: '#efefef',
    backgroundColor: 'white'
  }
});
