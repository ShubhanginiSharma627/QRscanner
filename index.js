/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { firebase } from '@react-native-firebase/app';
firebase.initializeApp({
    // ... other config
    authDomain: "qrscanner-6edf4.firebaseapp.com",
  });
  
AppRegistry.registerComponent(appName, () => App);
