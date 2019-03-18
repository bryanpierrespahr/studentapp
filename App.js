import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { AppStackNavigator } from './navigator.js'
import { AuthNavigator } from './navigator.js'
import LoginScreen from './screens/LoginScreen'
import LoadingScreen from './screens/LoadingScreen'

console.disableYellowBox = true;

//Switch navigator 1. Application
export default createSwitchNavigator({

    Loading: LoadingScreen,
    Auth : AuthNavigator,
    App: AppStackNavigator
})

console.disableYellowBox = true;