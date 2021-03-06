//Navigators
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import DashboardScreen from "./screens/DashboardScreen";
import OverviewScreen from "./screens/OverviewScreen";
import InfosScreen from "./screens/InfosScreen";
import AchievementsScreen from "./screens/AchievementsScreen";
import WebViewScreen from "./screens/WebViewScreen";
import QuizScreen from "./screens/QuizScreen";
import CourseScreen from "./screens/CourseScreen";
import QuizResultScreen from "./screens/QuizResultScreen";
import RecommendationScreen from "./screens/RecoScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

console.disableYellowBox = true;

export const AuthNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
        }
    },
    SignUp: {
        screen: SignUpScreen,
        navigationOptions: {
            header: null,
        }
    }
});

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

const QuizResultStack = createStackNavigator({
    QuizResult: {
        screen: QuizResultScreen,
        navigationOptions: {
            header: null,
        }
    }
})

const QuizStack = createStackNavigator({
    Quiz: {
        screen: QuizScreen,
        navigationOptions: {
            header: null,
        }
    },
    QuizResult: {
        screen: QuizResultScreen,
        navigationOptions: {
            header: null,
        }
    }
})

export default CourseTabNavigator = createBottomTabNavigator({
    Overview: {
        screen: OverviewStack,
        navigationOptions: {
            tabBarLabel: 'OVERVIEW',
            tabBarOptions: {
                labelStyle: {
                    fontSize: 14,
                    marginBottom: 10,
                },
            }
        }
    },
    Infos: {
        screen: InfosStack,
        navigationOptions: {
            tabBarLabel: 'INFOS',
            tabBarOptions: {
                labelStyle: {
                    fontSize: 14,
                    marginBottom: 10,
                },
            }
        }
    },
    Achievements: {
        screen: AchievementsStack,
        navigationOptions: {
            tabBarLabel: 'ACHIEVEMENTS',
            tabBarOptions: {
                labelStyle: {
                    fontSize: 14,
                    marginBottom: 10,
                },
            }
        }
    }
}, {
    initialRouteName: 'Overview',
    order: ['Overview', 'Infos', 'Achievements']
});


CourseTabNavigator.navigationOptions = ({navigation}) => {

    const {routeName} = navigation.state.routes[navigation.state.index];

    const headerTitle = routeName;

    return {
        headerTitle
    }
}


export const AppStackNavigator = createStackNavigator({
    Home: {screen: HomeScreen},
    Dashboard: {screen: DashboardScreen},
    Recommendation: {screen: RecommendationScreen},
    Course: {
        screen: CourseScreen,
    },
    WebView: {
        screen: WebviewStack,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.title}`,
        })
    },
    Quiz: {
        screen: QuizStack,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.course.name} - ${navigation.state.params.quiz.title}`,
        })
    },
    QuizResult: {
        screen: QuizResultStack,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.course.name} - ${navigation.state.params.quiz.title}`,
        })
    }
})

console.disableYellowBox = true;
