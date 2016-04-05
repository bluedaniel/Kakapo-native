import React, { PropTypes, TouchableOpacity, Image, Text, View, Animated } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import { soundActions } from '../actions';
import styles from '../styles/header';

const fadeAnim = new Animated.Value(0);

const Header = ({
  themes,
  sounds,
  dispatch,
  toggleMenu
}, {
  drawer
}) => {
  const toValue = sounds.filter(_s => _s.playing).count() ? 1 : 0;
  const animation = Animated.timing(fadeAnim, { toValue });
  if (fadeAnim._value !== toValue) animation.start();

  return (
    <View style={[ styles.header, themes.getIn([ 'nav', 'navbar' ]).toJS() ]}>
      <TouchableOpacity onPress={drawer.toggle}>
        <Octicons
          name="three-bars"
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
        <Animated.View style={{ opacity: fadeAnim }}>
          <Octicons
            name="x"
            size={30}
            color="#fff"
            style={styles.multiple}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

Header.contextTypes = { drawer: PropTypes.object };

export default Header;
