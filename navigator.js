//Navigators
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import DashboardScreen from "./screens/DashboardScreen";
import OverviewScreen from "./screens/OverviewScreen";
import InfosScreen from "./screens/InfosScreen";
import AchievementsScreen from "./screens/AchievementsScreen";
import WebViewScreen from "./screens/WebViewScreen";
import QuizScreen from "./screens/QuizScreen";

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
});

const InfosStack = createStackNavigator({
    Infos: InfosScreen
});

const AchievementsStack = createStackNavigator({
    Achievements: AchievementsScreen
});

const WebviewStack = createStackNavigator({
    WebView: {
        screen: WebViewScreen,
        navigationOptions: {
            header: null,
        }
    }
});

const QuizStack = createStackNavigator({
    Quiz: {
        screen: QuizScreen,
        navigationOptions: {
            header: null,
        }
    }
})

export const CourseTabNavigator = createBottomTabNavigator({
    Overview: {
        screen: OverviewStack,
        navigationOptions: {
            tabBarLabel: 'OVERVIEW'
        }
    },
    Infos: {
        screen: InfosStack,
        navigationOptions: {
            tabBarLabel: 'INFOS'
        }
    },
    Achievements: {
        screen: AchievementsStack,
        navigationOptions: {
            tabBarLabel: 'ACHIEVEMENTS'
        }
    },
});

CourseTabNavigator.navigationOptions = {
    // Hide the header from AppNavigator stack
    header: null,
};

export const AppStackNavigator = createStackNavigator({
    Dashboard: {screen: DashboardScreen},
    Course: {screen: CourseTabNavigator},
    WebView: {
        screen: WebviewStack,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.title}`,
        })
    },
    Quiz: {
        screen: QuizStack,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.course.name} - Quiz ${navigation.state.params.quiz.id}`,
        })
    }
})