import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import API from "../utils/api";

class InfosScreen extends Component {

    static navigationOptions = ({navigation}) => {

        return {
            headerTitle: 'Infos',
            // headerTitle: navigation.getParam('courseName', 'NO TITLE'),
            headerLeft: (
                <Icon.Button name='arrow-back'
                             backgroundColor='white'
                             color='black'
                             size={24}
                             onPress={() => navigation.state.params.goBack()}/>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {course: null, teacher: null};
    }

    componentDidMount() {

        this.props.navigation.setParams({
            goBack: this.goBackToDashboard.bind(this)
        });

        const course = this.props.screenProps.course;

        this.setState({
            course: course
        })

        API.getTeacher(course.teacherId)
            .then((data) => {
                this.setState({
                    teacher: data.data
                })
            })

    }

    goBackToDashboard() {

        const nav = this.props.screenProps.navigation;
        nav.navigate('Dashboard');

    }

    render() {

        if (this.state.course != null && this.state.teacher != null) {

            const course = this.state.course;
            const teacher = this.state.teacher;

            return (
                <View style={styles.container}>
                    <View style={styles.head}>
                        <ImageBackground source={require('../assets/overview_background.png')}
                                         style={styles.imageBackground}>
                            <View>
                                <Text style={styles.courseTitle}>{this.state.course.name}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.body}>
                        <ScrollView>
                            <Text style={styles.subTitle}>Teacher</Text>
                            <Text style={styles.paragraph}>Name : {teacher.firstName} {teacher.lastName}</Text>
                            <Text style={styles.paragraph}>Email : {teacher.email}</Text>
                            <Text style={styles.subTitle}>Course Description</Text>
                            <Text style={styles.paragraph}>Name : {course.name}</Text>
                            <Text style={styles.paragraph}>Code : {course.code}</Text>
                            <Text style={styles.paragraph}>Scope : {course.scope}</Text>
                            <Text style={styles.paragraph}>Timing : {course.timing}</Text>
                            <Text style={styles.paragraph}>Language : {course.language}</Text>
                            <Text style={styles.paragraph}>Course level : {course.level}</Text>
                            <Text style={styles.paragraph}>Course type : {course.type}</Text>
                            <Text style={styles.subTitle}>Objective</Text>
                            <Text style={styles.paragraph}>{course.objective}</Text>
                        </ScrollView>
                    </View>

                </View>
            )

        }

        return null;
    }

}

export default InfosScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    head: {
        flex: 15
    },
    body: {
        flex: 85,
        paddingHorizontal:3,
    },
    imageBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    courseTitle: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 18,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        marginTop: 5,
    },
    paragraph:{
        fontSize: 14
    }
})