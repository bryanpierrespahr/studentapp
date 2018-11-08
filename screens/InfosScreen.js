import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

class InfosScreen extends Component {

    static navigationOptions = ({navigation}) => {

        return {
            headerTitle: 'Infos',
            // headerTitle: navigation.getParam('courseName', 'NO TITLE'),
            headerLeft: (
                <Icon.Button name='arrow-back'
                             backgroundColor='white'
                             color='black'
                             size={24}
                             onPress={() => navigation.state.params.goBack()}/>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {course: null};
    }

    componentDidMount() {

        console.log(this.props.navigation.getParam('course'));

        this.props.navigation.setParams({
            goBack: this.goBackToDashboard.bind(this)
        });

        this.setState({
            course: this.props.navigation.getParam('course', 'NO-COURSE')
        })
    }

    goBackToDashboard() {

        const nav = this.props.screenProps.navigation;
        nav.navigate('Dashboard');

    }

    render() {

        if (this.state.course != null) {

            return (
                <View style={styles.container}>
                    <View style={styles.head}>
                        <ImageBackground source={require('../assets/overview_background.png')}
                                         style={styles.imageBackground}>
                            <View>
                                <Text>{this.state.course.name}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.body}>

                    </View>
                </View>
            )

        }

        return null;
    }

}

export default InfosScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    head: {
        flex: 15
    },
    body: {
        flex: 85
    },
    imageBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})