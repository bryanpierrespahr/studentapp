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


        this.getCourses(student.courses);


    }

    render() {

        if (this.state.student != null && this.state.courses != null) {

            const courses = this.state.courses;

            courses.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

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
        backgroundColor: '#90EE90',
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