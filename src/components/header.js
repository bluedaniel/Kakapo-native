import React, { Component, TouchableOpacity, Image, StyleSheet, Text, View, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import { Icon } from 'react-native-icons';
import { settingActions, soundActions } from '../actions';

class Header extends Component {
  render() {
    return (
      <View style={[ styles.header, this.props.themes.getIn([ 'nav', 'navbar' ]).toJS() ]}>
        <TouchableOpacity onPress={this.props.toggleMenu}>
          <Icon
            name="material|menu"
            size={30}
            color="#fff"
            style={[ styles.menu, this.props.themes.getIn([ 'nav', 'tab' ]).toJS() && styles.menuActive ]}
          />
        </TouchableOpacity>
        <View style={styles.title}>
          <Image style={styles.logo} source={require('kakapo-assets/images/kakapo.png')}/>
          <Text style={styles.headerText}>{this.props.title}</Text>
        </View>
        <TouchableOpacity onPress={this.props.soundActions.soundsToggleAll}>
          <Icon
            name={'material|stop'}
            size={30}
            color="#fff"
            style={[ styles.multiple, !this.props.sounds.filter(_s => _s.playing).count() && styles.multipleHide ]}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

const mapStateToProps = state => ({
  themes: state.themes,
  settings: state.settings,
  sounds: state.sounds
});

const mapDispatchToProps = dispatch => ({
  settingActions: bindActionCreators(settingActions, dispatch),
  soundActions: bindActionCreators(soundActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
