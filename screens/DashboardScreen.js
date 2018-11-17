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

        if (this.state.student != null && this.state.courses != null) {

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