//Navigators
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import DashboardScreen from "./screens/DashboardScreen";
import OverviewScreen from "./screens/OverviewScreen";
import InfosScreen from "./screens/InfosScreen";

export const AppStackNavigator = createStackNavigator({
    Dashboard : {
        screen: DashboardScreen
    },
    Course : {
        screen: CourseTabNavigator
    }
})

export const CourseTabNavigator = createBottomTabNavigator({
    Overview : {
        screen : OverviewScreen,
        navigationOptions : {
            tabBarLabel: 'OVERVIEW'
        }
    },
    Infos : {
        screen : InfosScreen,
        navigationOptions : {
            tabBarLabel: 'INFOS'
        }
    },
    Achievements : {
        screen : OverviewScreen,
        navigationOptions : {
            tabBarLabel: 'ACHIEVEMENTS'
        }
    },

})