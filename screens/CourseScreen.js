import React, {Component} from 'react';
import {Text, View} from 'react-native';
import CourseTabNavigator from '../navigator';

class CourseScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };


    render() {

        const course = this.props.navigation.getParam('course', 'default');
        const weeks = this.props.navigation.getParam('weeks', 'default');

        return (
            <CourseTabNavigator
                screenProps={{course: course, weeks: weeks, navigation: this.props.navigation}}></CourseTabNavigator>
        )
    }
}

export default CourseScreen;