import React, { ActivityIndicatorIOS, View } from 'react-native';
import styles from '../styles/loading';

export default ({ loaded }) => (
  <View style={styles.activityContainer}>
    <ActivityIndicatorIOS
      animating={!loaded}
      style={styles.activityIndicator}
      size="large"
    />
  </View>
);
