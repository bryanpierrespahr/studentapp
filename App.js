import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { AppStackNavigator } from './navigator.js'
import { AuthStackNavigator } from './navigator.js'
import LoginScreen from './screens/LoginScreen'

//Switch navigator 1. Application
export default createSwitchNavigator({
    Auth: LoginScreen,
    App: AppStackNavigator
})
