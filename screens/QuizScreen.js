import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

class QuizScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {course: null, quiz: null};
    }

    componentDidMount() {

        this.props.navigation.setParams({
            goBack: this.goBackToDashboard.bind(this)
        });

        this.setState({
            course: this.props.navigation.getParam('course', 'NO-COURSE'),
            quiz: this.props.navigation.getParam('quiz', 'default')
        })
    }

    goBackToDashboard() {
        this.props.navigation.navigate('Dashboard');
    }


    render() {

        return (
            <View style={styles.container}>
                <Text>QuizScreen</Text>
            </View>
        )
    }

}

export default QuizScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})