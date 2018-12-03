import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

class AchievementsScreen extends Component {

    static navigationOptions = ({navigation}) => {

        return {
            headerTitle: 'Achievements',
            headerLeft: (
                <Icon.Button name='arrow-back'
                             backgroundColor='white'
                             color='black'
                             size={24}
                             onPress={() => navigation.state.params.goBack()}/>
            ),
        };
    };
    getInfo = () => {

        this.getResults();
        this.getStatistics();
    }
    getResults = () => {

        const studentCourses = this.state.student.courses;
        const currentCourseId = this.state.course._id;

        var index = studentCourses.findIndex(c => {
            return c.courseId == currentCourseId
        })

        this.setState({
            results: this.state.student.courses[index].globalResults
        })
    }
    getStatistics = () => {

        const studentCourses = this.state.student.courses;
        const currentCourseId = this.state.course._id;

        var index = studentCourses.findIndex(c => {
            return c.courseId == currentCourseId
        })

        const timeSpent = this.state.student.courses[index].timeSpent;
        var time = this.secondsToTime(timeSpent);

        const hours = time.h;
        const minutes = time.m;
        const seconds = time.s;

        this.setState({
            hourSpent: hours,
            minuteSpent: minutes,
            secondSpent: seconds,
        })
    }

    secondsToTime = (secs) => {

        var hours = Math.floor(secs / (60 * 60));

        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);

        var obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }


    renderResults = ({item, index}) => {

        return (

            <View style={styles.result}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.score}>{item.score}</Text>
            </View>
        )

    }

    constructor(props) {
        super(props);
        this.state = {course: null, student: null, results: [], hourSpent: 0, minuteSpent: 0, secondSpent: 0};
    }

    componentDidMount() {

        this.props.navigation.setParams({
            goBack: this.goBackToDashboard.bind(this)
        });

        this.setState({
            course: this.props.screenProps.course,
            student: this.props.screenProps.student
        }, () => this.getInfo())


    }

    goBackToDashboard() {
        const nav = this.props.screenProps.navigation;
        nav.navigate('Dashboard');
    }

    render() {

        if (this.state.results.length > 1) {

            return (
                <View style={styles.container}>
                    <Text>Results</Text>
                    <FlatList
                        data={this.state.results}
                        renderItem={this.renderResults}
                        keyExtrator={(item, index) => index.toString()}/>
                    <Text>Total time spent : {this.state.hourSpent} hours&#32;
                        {this.state.minuteSpent} minutes&#32;
                        {this.state.secondSpent} seconds </Text>
                </View>
            )

        }

        return null;


    }

}

export default AchievementsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },

    result: {
        flex: 1,
        flexDirection: 'row',
    },

    title: {},

    score: {},
})