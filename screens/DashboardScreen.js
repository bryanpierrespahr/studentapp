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
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import API from '../utils/api';

class DashboardScreen extends Component {

    static navigationOptions = {
        title: 'Dashboard',
    };

    onPress = (course) => {

        this.props.navigation.navigate('Course', {
            course: course,
            student: this.state.student
        });


    }

    getCourses = (studentCourses) => {

        console.log("Student courses : "+JSON.stringify(studentCourses[0].courseId));

        var courses2 = [];
        var fetches2 = [];

        const burl = "http://backend-backend.7e14.starter-us-west-2.openshiftapps.com/course/";

        for (var i = 0; i < studentCourses.length; i++) {

            fetches2.push(
                fetch(burl + studentCourses[i].courseId)
                    .then((response) => response.json())

                    .then((data) => {

                        console.log("Data "+data)
                        console.log("Data " + JSON.stringify(data))
                        var course = data;
                        console.log("Course " + course)
                        courses2.push(course);
                    })
            )
        }

        Promise.all(fetches2).then(() => {

            this.setState({
                courses: courses2,
                ready: true,
            })
        })


        // var courses = [];
        //
        // for (let i = 0; i < studentCourses.length; i++) {
        //
        //     if(i+1 == studentCourses.length){
        //
        //     }else{
        //
        //     }
        //     API.getCourse(studentCourses[i].courseId)
        //         .then((data) => {
        //             const course = data.data;
        //             console.log("COURSE : "+JSON.stringify(course))
        //             courses.push(course);
        //
        //         })
        // }
        //

    }

    constructor(props) {
        super(props);
        this.state = {courses: [], student: null, ready: false};
    }

    componentDidMount() {

        const student = this.props.navigation.getParam('student');

        this.setState({
            student: student
        })

        this.getCourses(student.courses);


    }

    render() {

        // if (this.state.student != null && this.state.courses != null) {

        if (this.state.ready) {

            const courses = this.state.courses;
            console.log("Courses : " + courses)

            courses.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.courses}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) =>
                            <TouchableOpacity onPress={() => this.onPress(item)}>
                                <View style={styles.course}>
                                    <Text style={styles.courseName}>
                                        {item.name}
                                    </Text>
                                    <IoniconsIcon
                                        style={styles.ic}
                                        name='ios-arrow-forward'
                                        backgroundColor='white'
                                        color='black'
                                        size={30}/>
                                </View>
                            </TouchableOpacity>}
                    />
                </View>
            )
        } else {
            return (
                <View/>
            )
        }

    }


}

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 7,
    },
    course: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: '#83C669',
        marginVertical: 6,
        borderRadius: 10,
        padding: 5,
    },
    courseName: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500'
    },
    ic: {
        marginLeft: 'auto',
    },
})