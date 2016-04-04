import React, { Component } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './stores/configureStore';
import { App } from './containers';

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>{() => <App/>}</Provider>
    );
  }
}
