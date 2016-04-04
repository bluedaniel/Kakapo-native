import React, { TouchableOpacity, Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { soundActions } from '../actions';
import styles from '../styles/header';

export default ({
  themes,
  sounds,
  dispatch,
  toggleMenu
}) => (
  <View style={[ styles.header, themes.getIn([ 'nav', 'navbar' ]).toJS() ]}>
    <TouchableOpacity onPress={toggleMenu}>
      <Icon
        name="menu"
        size={30}
        color="#fff"
        style={[
          styles.menu,
          themes.getIn([ 'nav', 'tab' ]).toJS() && styles.menuActive
        ]}
      />
    </TouchableOpacity>
    <View style={styles.title}>
      <Image style={styles.logo} source={require('kakapo-assets/images/kakapo.png')} />
      <Text style={styles.headerText}>Kakapo</Text>
    </View>
    <TouchableOpacity onPress={() => dispatch(soundActions.soundsToggleAll)}>
      <Icon
        name="stop"
        size={30}
        color="#fff"
        style={[
          styles.multiple,
          !sounds.filter(_s => _s.playing).count() && styles.multipleHide
        ]}
      />
    </TouchableOpacity>
  </View>
);
