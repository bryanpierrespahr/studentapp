import React from 'react';
import {YellowBox} from 'react-native';
import {createSwitchNavigator} from 'react-navigation';
import {AppStackNavigator, AuthNavigator} from './navigator.js'
import LoadingScreen from './screens/LoadingScreen'

console.disableYellowBox = true;
YellowBox.ignoreWarnings([
    'Require cycle:',
    'VirtualizedList',
]);

//Switch navigator 1. Application
export default createSwitchNavigator({

    Loading: LoadingScreen,
    Auth: AuthNavigator,
    App: AppStackNavigator
})
