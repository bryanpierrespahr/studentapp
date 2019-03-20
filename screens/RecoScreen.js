import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Button,
    AsyncStorage
} from 'react-native'
import API from '../utils/api';
import Moment from 'react-moment';
import 'moment-timezone';

class RecommendationScreen extends Component {

    static navigationOptions = {
        title: 'Recommendation',
    };

    getCourses = (studentCourses) => {

        console.log("Student courses : "+JSON.stringify(studentCourses))

        var courses = [];
        var fetches = [];

        const burl = "http://backend-backend.7e14.starter-us-west-2.openshiftapps.com/course/";

        for (var i = 0; i < studentCourses.length; i++) {

            fetches.push(
                fetch(burl + studentCourses[i].courseId)
                    .then((response) => response.json())
                    .then((data) => {
                        var course = data;
                        courses.push(course);
                    })
            )
        }

        Promise.all(fetches).then(() => {
            this.setState({
                courses: courses,
            }, () => this.getFavoritesCourses(courses))

        })

    }

    getFavoritesCourses = (courses) => {

        const studentCourses = this.state.student.courses;

        var coursesTotal = [];

        for (var i = 0; i < courses.length; i++) {

            console.log("course name : "+courses[i].name)
            console.log("course name : "+courses[i].path)

            for (var z = 0; z < courses.length; z++) {

                if (courses[z]._id == studentCourses[i].courseId) {
                    var name = courses[z].name
                }
            }

            let c = {
                'name': name,
                'globalScore': studentCourses[i].globalScore,
                'percentage': studentCourses[i].percentage,
                'timeSpent': studentCourses[i].timeSpent,
                'path': studentCourses[i].path,
                'total': studentCourses[i].globalScore + (studentCourses[i].percentage / 3)
            }

            coursesTotal.push(c);

            if (i + 1 == studentCourses.length) {
                console.log("Courses total " + JSON.stringify(coursesTotal))
                this.sortCourses(coursesTotal);
            }

        }

    }

    orderFavoritesCourses = (a, b) => {
        if (a.total > b.total)
            return -1;
        if (a.total < b.total)
            return 1;
        if (a.total = b.total) {
            if (a.timeSpent < b.timeSpent)
                return 1;
            else
                return -1;
        }
        return 0;
    }

    sortCourses = (courses) => {

        console.log("courses : " + JSON.stringify(courses))

        courses.sort(this.orderFavoritesCourses);

        var path = [
            {name: "Design", points: 0},
            {name: "Programming", points: 0},
            {name: "Business", points: 0},
            {name: "Technology", points: 0},
        ];

        var points = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

        for (let h = 0; h < 10 && h < courses.length; h++) {
            // console.log(courses[h].path)
            // console.log(courses[h].points);

            //  console.log("Courses string : "+JSON.stringify(courses[h]))
            // console.log("COurse is : "+courses[h].name);
            // console.log("course path is : "+courses[h].path);

            switch (courses[h].path) {
                case 'Design':
                    path[0].points += points[h];
                    break;
                case 'Programming':
                    path[1].points += points[h];
                    break;
                case 'Business':
                    path[2].points += points[h];
                    break;
                case 'Technology':
                    path[3].points += points[h];
                    break;
            }

        }

        //  console.log(JSON.stringify(path)+" BEFORE")
        path.sort((a, b) => (a.points < b.points) ? 1 : ((b.points < a.points) ? -1 : 0));
        //  console.log(JSON.stringify(path)+" AFTER")

        this.setState({
            favoriteCourses: courses,
            recommendedPath: path[0].name
        })

    }

    renderCourse = ({item, index}) => {

        var moment = require("moment");

        const grade = Number((item.total / 133) * 4 + 1).toFixed(2);
        const seconds = item.timeSpent;
        const time = moment.utc(seconds * 1000).format('HH:mm:ss');
        const globalScore = item.globalScore;
        const roundedGS = Number(globalScore).toFixed(2);

        return (

            <View style={styles.courseContainer}>
                <View style={styles.noContainer}>
                    <Text style={styles.no}>{index + 1}</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={styles.gsContainer}>
                    <Text style={styles.number}>{roundedGS}</Text>
                </View>
                <View style={styles.percentageContainer}>
                    <Text style={styles.number}>{item.percentage} %</Text>
                </View>
                <View style={styles.timeSpentContainer}>
                    <Text style={styles.number}>{time}</Text>
                </View>
                <View style={styles.gradeContainer}>
                    <Text style={styles.no}>{grade}</Text>
                </View>
            </View>

        );
    }


    constructor(props) {
        super(props);
        this.state = {courses: [], student: null, favoriteCourses: null, recommendedPath: ''};
    }

    componentDidMount() {

        const student = this.props.navigation.getParam('student');

        this.setState({
            student: student
        }, () => this.getCourses(student.courses))
    }

    render() {

        if (this.state.favoriteCourses != null) {

            const courses = this.state.favoriteCourses;

            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Favorites courses</Text>
                    <View style={styles.head}>
                        <View style={styles.noContainer}>
                            <Text style={styles.header}>No</Text>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.header}>Name</Text>
                        </View>
                        <View style={styles.gsContainer}>
                            <Text style={styles.header}>Score</Text>
                        </View>
                        <View style={styles.percentageContainer}>
                            <Text style={styles.header}>Done</Text>
                        </View>
                        <View style={styles.timeSpentContainer}>
                            <Text style={styles.header}>Time</Text>
                        </View>
                        <View style={styles.gradeContainer}>
                            <Text style={styles.header}>Grade</Text>
                        </View>
                    </View>
                    <FlatList
                        style={styles.flatList}
                        data={courses}
                        renderItem={this.renderCourse}
                        keyExtrator={(item, index) => index.toString()}
                    />
                    <View style={styles.recommendationContainer}>
                        <Text style={styles.recoText}>Recommended path : </Text>
                        <Text style={styles.recoPath}>{this.state.recommendedPath}</Text>
                    </View>

                </View>
            )
        }
        return null;

    }

}

export default RecommendationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 7,
    },

    title: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '500',
        marginTop: 8,
        marginBottom: 12,
    },

    flatList: {
        flexGrow: 0,
    },

    head: {

        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
        backgroundColor: '#74C365',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },

    courseContainer: {

        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
        backgroundColor: '#83C669'
    },

    header: {
        fontWeight: 'bold',
    },

    noContainer: {
        flex: 2,
    },

    no: {
        fontWeight: '500',
    },

    name: {

        fontSize: 15
    },

    nameContainer: {
        flex: 5,
    },

    gsContainer: {
        flex: 2
    },

    percentageContainer: {
        flex: 2
    },

    timeSpentContainer: {
        flex: 3
    },

    gradeContainer: {
        flex: 2
    },

    number: {
        fontSize: 15
    },

    recommendationContainer: {
        flexDirection: 'row',
    },

    recoText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },

    recoPath: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 10,
        color: '#74C365'
    }

})