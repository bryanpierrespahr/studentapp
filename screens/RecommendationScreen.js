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

class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home',
    };

    // onPress = (course) => {
    //
    //     this.props.navigation.navigate('Course', {
    //         course: course,
    //         student: this.state.student
    //     });
    //
    // }

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

        if (this.state.student != null) {

            return (
                <View style={styles.container}>

                    <TouchableOpacity onPress={() => this.logout}>
                        <View style={styles.course}>
                            <Text style={styles.courseName}>
                                LOG OUT
                            </Text>
                            <IoniconsIcon
                                style={styles.ic}
                                name='ios-arrow-forward'
                                backgroundColor='white'
                                color='black'
                                size={30}/>
                        </View>
                    </TouchableOpacity>}

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

export default HomeScreen;

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