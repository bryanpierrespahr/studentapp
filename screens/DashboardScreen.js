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

        console.log("Dashboard : course : "+course)

        this.props.navigation.navigate('Course', {
            course: course,
            weeks: course.weeks,
            student: this.state.student
        });


    }
    keyExtractor = (item) => {
        return item.code
    }

    navigateToScreen = () => {

        this.props.navigation.navigate('');

    }

    logout = () => {

        API.logout();
        this.props.navigation.navigate('Loading');

    }
    getCourses = (studentCourses) => {

        var courses = [];

        for (let i = 0; i < studentCourses.length; i++) {
            API.getCourse(studentCourses[i].courseId)
                .then((data) => {
                    const course = data.data;
                    courses.push(course);
                    this.setState({
                        courses: courses
                    })
                })
        }

    }

    constructor(props) {
        super(props);
        this.state = {courses: [], student: null};
    }

    componentDidMount() {

        const student = this.props.navigation.getParam('student');

        this.setState({
            student: student
        })

        API.getStudent(student._id)
            .then((data) => {
                this.setState({
                    student: data.data
                })
            })

        this.getCourses(student.courses);

    }

    render() {

        // const courses = [
        //     {
        //         name: 'Digital Service Design',
        //         code: 'DIG4TF021',
        //         scope: '5 ECTS',
        //         timing: '3rd Semester',
        //         language: 'English',
        //         level: 'Profile studies',
        //         type: 'Elective',
        //         objective: 'Upon successful completion of this course, ' +
        //         'the student should be able to understand how to create better services by utilizing existing ' +
        //         'technologies and API’s along with graphical design theories and principles.',
        //         teacher: {
        //             name: 'Amir Dirin',
        //             email: 'amir.dirin@haaga-helia.fi'
        //         },
        //         schedule: {
        //             day: 'Thursday',
        //             hour: '8:30 - 11:30',
        //             room: '5001',
        //         },
        //         weeks: [
        //             {
        //                 weekId: 1,
        //                 weekLectures: [
        //                     {
        //                         id: 1,
        //                         no: 1,
        //                         title: 'PDF 1',
        //                         link: 'exampleFile1',
        //                         type: 'lecture'
        //                     },
        //                     {
        //                         id: 2,
        //                         no: 1,
        //                         title: 'PDF 2',
        //                         link: 'exampleFile2',
        //                         type: 'lecture'
        //                     },
        //                     {
        //                         id: 3,
        //                         no: 2,
        //                         title: 'PDF 3',
        //                         link: 'exampleFile3',
        //                         type: 'lecture'
        //                     }
        //                 ],
        //                 weekLinks: [
        //                     {
        //                         linkId: 1,
        //                         linkNo: 1,
        //                         title: 'What is Service Design',
        //                         link: 'https://boagworld.com/digital-strategy/service-design/',
        //                         type: 'link'
        //                     },
        //                     {
        //                         linkId: 2,
        //                         linkNo: 2,
        //                         title: 'The rise of Digital Service Design',
        //                         link: 'https://clearleft.com/posts/the-rise-of-digital-service-design',
        //                         type: 'link'
        //                     }
        //                 ],
        //                 weekQuizzes: [
        //                     {
        //                         id: 1,
        //                         no: 1,
        //                         title: 'Quiz 1',
        //                         type: 'quiz'
        //                     },
        //                     {
        //                         id: 2,
        //                         no: 2,
        //                         title: 'Quiz 2',
        //                         type: 'quiz'
        //                     },
        //                 ]
        //             },
        //             {
        //                 weekId: 2,
        //                 weekLectures: [
        //                     {
        //                         id: 4,
        //                         no: 1,
        //                         title: 'PDF 4',
        //                         link: 'exampleFile4',
        //                         type: 'lecture'
        //                     }
        //                 ],
        //                 weekLinks: [
        //                     {
        //                         linkId: 3,
        //                         linkNo: 1,
        //                         title: 'Taxonomy of Digital Service Design',
        //                         link: 'https://aisel.aisnet.org/cgi/viewcontent.cgi?referer=https://www.google.com/&httpsredir=1&article=1064&context=icis2016',
        //                         type: 'link'
        //                     }
        //                 ],
        //                 weekQuizzes: [
        //                     {
        //                         id: 3,
        //                         no: 1,
        //                         title: 'Quiz 1',
        //                         type: 'quiz'
        //                     }
        //                 ]
        //             }
        //         ]
        //
        //     }, {
        //         name: 'Mobile Programming',
        //         code: 'SWD4TF020',
        //     }, {
        //         name: 'Business Intelligence',
        //         code: 'BUS8TF017',
        //     }, {
        //         name: 'Front End Development',
        //         code: 'SWD4TF022',
        //     }, {
        //         name: 'Future Learning Research',
        //         code: 'PRO8TF100-3001',
        //     }, {
        //         name: 'Linux Basics',
        //         code: 'DAT8TF063',
        //     }];

        if (this.state.student != null && this.state.courses != null) {

            console.log("Student = " + this.state.student);

            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.courses}
                        keyExtractor={this.keyExtractor}
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
                    <Text>Email : {this.state.student.email}</Text>
                    <Button
                        size={50}
                        title='TEST'
                        onPress={this.navigateToScreen}></Button>
                    <Button
                        size={50}
                        title='LOG OUT'
                        onPress={this.logout}></Button>
                </View>
            )
        }
        return null;

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
        height: 30,
        backgroundColor: '#D3D3D3',
        marginVertical: 6,
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