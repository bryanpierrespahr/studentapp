import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

class AchievementsScreen extends Component {

    static navigationOptions = ({navigation}) => {

        return {
            headerTitle: 'Achievements',
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

        this.props.navigation.setParams({
            goBack: this.goBackToDashboard.bind(this)
        });

    }

    goBackToDashboard() {
        const nav = this.props.screenProps.navigation;
        nav.navigate('Dashboard');
    }


    render() {

        return (
            <View style={styles.container}>
                <Text></Text>
            </View>
        )
    }

}

export default AchievementsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})