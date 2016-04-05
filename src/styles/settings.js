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
    height: 40,
    left: -13,
    position: 'relative',
    width: 40,
    fontSize: 50
  },
  opt: {
    fontFamily: 'SFUIDisplay-Medium',
    color: '#fff',
    fontSize: 16,
    marginTop: 17,
    marginBottom: 13
  }
});
