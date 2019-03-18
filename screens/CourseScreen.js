import React, {Component} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import CourseTabNavigator from '../navigator';
import API from '../utils/api';

class CourseScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };

    saveTimeSpent = (timeSpent) => {

        const studentId = this.state.student._id;
        const currentCourseId = this.state.course._id;

        var index = this.state.student.courses.findIndex(c => {
            return c.courseId == currentCourseId
        })

        const courses = this.state.student.courses;
        courses[index].timeSpent += timeSpent;

        API.patchTimeSpent(studentId, courses)
            .then((response) => {
            })
    }

    constructor(props) {
        super(props);
        this.state = {openedAt: null, closedAt: null, timeSpent: null, courses: null, course: null, student: null}
    }

    componentDidMount() {

        var openedAt = new Date();

        this.setState({
            openedAt: openedAt
        })

        this.setState({
            course: this.props.navigation.getParam('course', 'default'),
            student: this.props.navigation.getParam('student', 'default'),
        })

    }

    componentWillUnmount() {

        var closedAt = new Date();

        var timeSpent = (closedAt.getTime() - this.state.openedAt.getTime()) / 1000;

        this.saveTimeSpent(timeSpent);

        this.setState({
            closedAt: closedAt,
            timeSpent: timeSpent
        })

    }

    render() {

        if (this.state.course != null) {

            return (
                <CourseTabNavigator
                    screenProps={{
                        courses: this.state.courses,
                        course: this.state.course,
                        student: this.state.student,
                        navigation: this.props.navigation
                    }}></CourseTabNavigator>
            )

        } else {
            return (
                <View>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }

    }
}

export default CourseScreen;