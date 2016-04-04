import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  settings: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 20,
    paddingLeft: 25,
    paddingRight: 20
  },
  header: {
    fontFamily: 'SFUIDisplay-Bold',
    color: '#fff',
    fontSize: 22,
    marginBottom: 13,
    marginTop: 30
  },
  headerFirst: {
    marginTop: 0
  },
  optWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  optWrapIcon: {
    height: 34,
    left: -5,
    marginTop: -8,
    position: 'relative',
    width: 34
  },
  opt: {
    fontFamily: 'SFUIDisplay-Medium',
    color: '#fff',
    fontSize: 16,
    marginTop: 7,
    marginBottom: 13
  }
});
