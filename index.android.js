process.env["os"] = "android";

import React from "react-native";
import {App} from "./src/containers";

React.AppRegistry.registerComponent('KakapoNative', () => App);
