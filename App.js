import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { AppStackNavigator } from './navigator.js'

//Switch navigator 1. Application
export default createSwitchNavigator({
    App: AppStackNavigator
})
