import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Button,
    AsyncStorage
} from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import API from '../utils/api';

class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home',
    };

    onPress = (screenName) => {
        this.props.navigation.navigate(screenName, {
            student: this.state.student
        });
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

        if (this.state.student != null) {

            const student = this.state.student;

            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={require('../assets/avatar.png')}
                               style={styles.avatar}/>
                        <Text style={styles.details}>{student.firstName} {student.lastName}</Text>
                        <Text style={styles.details}>{student.email}</Text>
                        <Text style={styles.details}>{student.number}</Text>
                    </View>
                    <View style={styles.body}>
                        <TouchableOpacity onPress={() => this.onPress('Dashboard')}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    My Courses
                                </Text>
                                <SimpleLineIcons
                                    style={styles.ic}
                                    name='book-open'
                                    backgroundColor='white'
                                    color='black'
                                    size={30}/>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.onPress('Recommendation')}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Recommendation
                                </Text>
                                <SimpleLineIcons
                                    style={styles.ic}
                                    name='directions'
                                    backgroundColor='white'
                                    color='black'
                                    size={30}/>
                            </View>
                        </TouchableOpacity>

                    </View>
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
        flexDirection: 'column',
        alignItems: 'center',
        padding: 7,
    },

    header: {
        marginTop: 15,
        flex: 2
    },

    avatar: {
        alignSelf: 'center',
        height: 200,
        width: 200,
    },

    details: {
        alignSelf: 'center',
        fontSize: 21,
        fontWeight: '400',
        marginBottom: 3,
    },

    body: {
        flex: 1,
        flexDirection: 'column',
    },

    ic: {
        marginLeft: 8,
    },

    button: {
        alignSelf: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        flexDirection: 'row',
        backgroundColor: '#D3D3D3',
        marginVertical: 8,
        borderRadius: 10,
    },

    buttonText:{
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500'
    }

})