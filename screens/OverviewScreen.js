import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

class OverviewScreen extends Component {

    static navigationOptions = ({navigation}) => {

        return {
            headerTitle: 'Overview',
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

        this.setState({
            course: this.props.navigation.getParam('course', 'NO-COURSE')
        })
    }

    goBackToDashboard() {
        this.props.navigation.navigate('Dashboard');
    }

    render() {

        return (
            <View style={styles.container}>
                <Text>OverviewScreen</Text>
            </View>
        )
    }

}

export default OverviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})