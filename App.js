import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { AppStackNavigator } from './navigator.js'
import LoginScreen from './screens/LoginScreen'
import LoadingScreen from './screens/LoadingScreen'

//Switch navigator 1. Application
export default createSwitchNavigator({
    Loading: LoadingScreen,
    Auth: LoginScreen,
    App: AppStackNavigator
})

console.disableYellowBox = true;