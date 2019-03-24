import React, {Component} from 'react'
import {WebView} from 'react-native'
import API from "../utils/api";

class WebViewScreen extends Component {

    saveTimeSpent = (timeSpent) => {

        const studentId = this.state.student._id;
        const currentCourseId = this.state.course._id;
        const item = this.state.item;

        var index = this.state.student.courses.findIndex(c => {
            return c.courseId == currentCourseId
        })


        var indexId = this.state.student.courses[index].done.findIndex(d => {
            return d.id == item._id
        })


        const courses = this.state.student.courses;
        courses[index].done[indexId].timeSpent += timeSpent;


        API.patchTimeSpent(studentId, courses)
            .then((response) => {

            })
            .catch(error => {
                console.error(error)
            })

        var newTimeSpent;

        switch (item.type) {
            case 'link':
                API.getLink(item._id)
                    .then((data) => {
                        var link = data.data;
                        var ts = link.timeSpent;
                        if (ts == null)
                            ts = 0
                        newTimeSpent = ts + timeSpent;
                    })
                    .then(() => {
                        API.patchTimeSpentLink(item._id, newTimeSpent)
                            .then((data) => {

                            })
                    })
                break;
            case 'lecture':
                API.getLecture(item._id)
                    .then((data) => {
                        var lecture = data.data;
                        var ts = lecture.timeSpent;
                        if (ts == null)
                            ts = 0
                        newTimeSpent = ts + timeSpent;
                    })
                    .then(() => {
                        API.patchTimeSpentLecture(item._id, newTimeSpent)
                            .then((data) => {

                            })
                    })
                break;
            case 'quiz':
                API.getQuiz(item._id)
                    .then((data) => {
                        var quiz = data.data;
                        var ts = quiz.timeSpent;
                        if (ts == null)
                            ts = 0
                        newTimeSpent = ts + timeSpent;
                    })
                    .then(() => {
                        API.patchTimeSpentQuiz(item._id, newTimeSpent)
                            .then((data) => {

                            })
                    })
                break;
        }

    }

    constructor(props) {
        super(props);
        this.state = {uri: '', openedAt: null, closedAt: null, timeSpent: null};
    }

    componentDidMount() {

        this.setState({
            uri: this.props.navigation.getParam('uri', 'default'),
            item: this.props.navigation.getParam('item', 'default'),
            student: this.props.navigation.getParam('student', 'default'),
            course: this.props.navigation.getParam('course', 'default'),
        })

        var openedAt = new Date();

        this.setState({
            openedAt: openedAt
        })


    }

    componentWillUnmount() {

        var closedAt = new Date();

        var timeSpent = (closedAt.getTime() - this.state.openedAt.getTime()) / 1000;


        this.saveTimeSpent(timeSpent);

    }

    render() {
        return (
            <WebView
                source={{uri: this.state.uri}}
            />
        )
    }
}

export default WebViewScreen;
