import React, {Component} from 'react';
import {Text, View} from 'react-native';
import CourseTabNavigator from '../navigator';

class CourseScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };

    constructor(props) {
        super(props);
        this.state = {openedAt: null, closedAt: null, timeSpent: null}
    }

    componentDidMount() {

        var openedAt = new Date();

        this.setState({
            openedAt: openedAt
        })

        console.log("Opened at : " + openedAt)

    }

    componentWillUnmount() {

        var closedAt = new Date();

        console.log("Closed at : " + closedAt);

        var timeSpent = (closedAt.getTime() - this.state.openedAt.getTime()) / 1000;

        console.log("TIME SPENT : " + timeSpent);

        this.setState({
            closedAt: closedAt,
            timeSpent: timeSpent
        })

    }

    render() {

        const course = this.props.navigation.getParam('course', 'default');
        //const weeks = this.props.navigation.getParam('weeks', 'default');
        const student = this.props.navigation.getParam('student', 'default');

        return (
            <CourseTabNavigator
                screenProps={{
                    course: course,
                    student: student,
                    navigation: this.props.navigation
                }}></CourseTabNavigator>
        )
    }
}

export default CourseScreen;