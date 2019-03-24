import React, {Component} from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

console.disableYellowBox = true;

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
            results: this.state.student.courses[index].globalResults,
            globalScore: this.state.student.courses[index].globalScore,
            resultsReady: true,
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
            statReady: true,
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

        const score = item.score;
        const roundedScore = Number(score).toFixed(2);

        return (

            <View style={styles.result}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.score}>{roundedScore} %</Text>
            </View>
        )

    }

    constructor(props) {
        super(props);
        this.state = {
            course: null,
            student: null,
            results: [],
            hourSpent: 0,
            minuteSpent: 0,
            secondSpent: 0,
            globalScore: 0,
            resultsReady: false,
            statReady: false
        };
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

        if (this.state.resultsReady && this.state.statReady) {

            const averageGS = this.state.globalScore;
            const roundedAvgGS = Number(averageGS).toFixed(2);

            return (
                <View style={styles.container}>
                    <Text style={styles.resultsTitle}>Results</Text>
                    <FlatList
                        style={styles.flatList}
                        data={this.state.results}
                        renderItem={this.renderResults}
                        keyExtrator={(item, index) => index.toString()}/>
                    <View style={styles.average}>
                        <Text style={styles.averageTitle}>Average</Text>
                        <Text style={styles.averageScore}>{roundedAvgGS} %</Text>
                    </View>
                    <Text style={styles.timeSpentTitle}>Total time spent</Text>
                    <Text style={styles.timeSpentText}>{this.state.hourSpent} hours&nbsp;
                        {this.state.minuteSpent} minutes&nbsp;
                        {this.state.secondSpent} seconds </Text>


                </View>
            )

        } else {
            return (
                <View style={styles.container}>
                    <Text>No results yet</Text>
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

    resultsTitle: {
        alignSelf: "center",
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },

    timeSpentTitle: {

        alignSelf: "center",
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },

    result: {
        flexDirection: 'row',
        marginBottom: 4,

    },

    average: {

        paddingTop: 5,
        marginTop: 5,
        paddingLeft: 5,
        marginLeft: 60,
        marginRight: 60,
        flexDirection: 'row',
        marginBottom: 5,
        paddingBottom: 5,
        borderTopWidth: 1,
        borderTopColor: 'black',
        borderBottomWidth: 3,
        borderBottomColor: 'black',
    },

    flatList: {
        flexGrow: 0
    },

    title: {
        flex: 1,
        marginLeft: 65,
        fontSize: 18,
        fontWeight: 'bold',
    },

    averageTitle: {

        fontSize: 18,
        fontWeight: 'bold',
    },

    averageScore: {

        marginRight: 50,
        marginLeft: 120,
        fontSize: 20,
        fontWeight: 'bold',
    },

    score: {
        flex: 1,
        marginRight: 10,
        marginLeft: 60,
        fontSize: 18,
    },

    timeSpentText: {
        alignSelf: 'center',
        fontSize: 18,
    },

})

console.disableYellowBox = true;