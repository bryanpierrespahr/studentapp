//Navigators
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import DashboardScreen from "./screens/DashboardScreen";
import OverviewScreen from "./screens/OverviewScreen";
import InfosScreen from "./screens/InfosScreen";
import AchievementsScreen from "./screens/AchievementsScreen";

// export const CourseTabNavigator = createBottomTabNavigator({
//     Overview : {
//         screen : OverviewScreen,
//         navigationOptions : {
//             tabBarLabel: 'OVERVIEW'
//         }
//     },
//     Infos : {
//         screen : InfosScreen,
//         navigationOptions : {
//             tabBarLabel: 'INFOS'
//         }
//     },
//     Achievements : {
//         screen : OverviewScreen,
//         navigationOptions : {
//             tabBarLabel: 'ACHIEVEMENTS'
//         }
//     },
//
// });
//
// CourseTabNavigator.navigationOptions = ({ navigation }) => {
//     const { routeName } = navigation.state.routes[navigation.state.index];
//
//     const headerTitle = routeName;
//
//     return {
//         headerTitle,
//     };
// };

const OverviewStack = createStackNavigator({
    Overview: OverviewScreen
})

const InfosStack = createStackNavigator({
    Infos: InfosScreen
})

const AchievementsStack = createStackNavigator({
    Achievements: AchievementsScreen
})

export const CourseTabNavigator = createBottomTabNavigator({
    Overview: OverviewStack,
    Infos: InfosStack,
    Achievements: AchievementsStack
})

CourseTabNavigator.navigationOptions = {
    // Hide the header from AppNavigator stack
    header: null,
};

export const AppStackNavigator = createStackNavigator({
    Dashboard: {
        screen: DashboardScreen
    },
    Course: {
        screen: CourseTabNavigator,
    }
})