import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    AsyncStorage,
    ScrollView
} from 'react-native';
import API from '../utils/api';


class SignUpScreen extends Component {


    storeToken = async (student, token) => {

        try {
            await AsyncStorage.setItem("token", token);
            await AsyncStorage.setItem("student", JSON.stringify(student))

        } catch (error) {
            console.log(error);
        }
    }

    //For testing purposes, add automatically JS intro & UX Design to student courses
    addExamplesCourses = (studentId) => {

        console.log("Adding example courses")

        var coursesToAdd = [];
        var JavaScriptCourse;
        var UXDesignCourse;

        //TODO : remove in prod
        const javaScriptCourseId = "5c8a1ba0f78a770019265865";
        const uxDesignCourseId = "5c8b7036acfabb001aa351d3";

        API.getCourse(javaScriptCourseId)
            .then((data) => {
                JavaScriptCourse = data.data;

                var JStoAdd = {
                    courseId: JavaScriptCourse._id,
                    path: JavaScriptCourse.path,
                    globalScore: 0,
                    globalResults: [],
                    quizResults: [],
                    timeSpent: 0,
                    done: [{

                    }],
                    percentage: 0
                }

                coursesToAdd.push(JStoAdd);
            })
            .then(() => {

                API.getCourse(uxDesignCourseId)
                    .then((data) => {
                        UXDesignCourse = data.data;

                        var UXtoAdd = {
                            courseId: UXDesignCourse._id,
                            path: UXDesignCourse.path,
                            globalScore: 0,
                            globalResults: [],
                            quizResults: [],
                            timeSpent: 0,
                            done: [{

                            }],
                            percentage: 0
                        }

                        console.log("UX design course : "+JSON.stringify(UXtoAdd))
                        coursesToAdd.push(UXtoAdd);
                    })
                    .then(() => {

                        console.log("Courses to add : " + coursesToAdd)

                        let JSstudents = JavaScriptCourse.students;
                        JSstudents.push(studentId);

                        API.patchCourseStudents(javaScriptCourseId, JSstudents)
                            .then((data) => {

                            })
                            .then(() => {
                                let UXstudents = UXDesignCourse.students;
                                UXstudents.push(studentId);

                                API.patchCourseStudents(uxDesignCourseId, UXstudents)
                                    .then((data) => {

                                    })
                                    .then(() => {
                                        API.patchStudentCourses(studentId, coursesToAdd)
                                            .then(() => {

                                            })
                                    })
                            })
                    })
            })
    }

    signUp = () => {


        const user = {
            "email": this.state.email,
            "password": this.state.password,
            "role": "student",
        }

        const student = {
            "number": this.state.number,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email": this.state.email,
            "password": this.state.password,
            "courses": []
        }

        API.signUpUser(user)
            .then((data) => {

            })

        API.signUpStudent(student)
            .then((data) => {

                console.log("Data data : " + data.data);
                console.log("Data data student : " + data.data.student);

                this.setState({
                    student: data.data.student
                }, () => this.storeToken(data.data.student, data.data.token));
            })
            .then(() => {
                this.addExamplesCourses(this.state.student._id);
            })
            .then(() => {

                this.props.navigation.navigate('Login', {
                    // student: this.state.student
                });

            })
            .catch(error => {
                console.log(error);
            })


    }

    constructor(props) {
        super(props);
        this.state = {firstName: '', lastName: '', email: '', password: '', student: null, password2: '', number: ''}
    }


    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <ScrollView>
                    <View style={styles.imageView}>
                        <Image style={styles.image}
                               source={require('../assets/haaga-helia.png')}/>
                    </View>

                    <View style={styles.form}>
                        <TextInput style={styles.inputBox}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                                   onChangeText={(firstName) => this.setState({firstName})}
                                   placeholder="First name"
                                   placeholderTextColor="#ffffff"
                                   selectionColor="#fff"
                                   keyboardType="text"
                                   onSubmitEditing={() => this.state.password.focus()}
                        />
                        <TextInput style={styles.inputBox}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                                   onChangeText={(lastName) => this.setState({lastName})}
                                   placeholder="Last name"
                                   placeholderTextColor="#ffffff"
                                   selectionColor="#fff"
                                   keyboardType="text"
                                   onSubmitEditing={() => this.state.password.focus()}
                        />
                        <TextInput style={styles.inputBox}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                                   onChangeText={(number) => this.setState({number})}
                                   placeholder="Student number"
                                   placeholderTextColor="#ffffff"
                                   selectionColor="#fff"
                                   keyboardType="text"
                                   onSubmitEditing={() => this.state.password.focus()}
                        />
                        <TextInput style={styles.inputBox}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                                   onChangeText={(email) => this.setState({email})}
                                   placeholder="Email"
                                   placeholderTextColor="#ffffff"
                                   selectionColor="#fff"
                                   keyboardType="email-address"
                                   onSubmitEditing={() => this.state.password.focus()}
                        />
                        <TextInput style={styles.inputBox}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                                   placeholder="Password"
                                   onChangeText={(password) => this.setState({password})}
                                   secureTextEntry={true}
                                   placeholderTextColor="#ffffff"
                                   ref={this.state.password}
                        />
                        <TextInput style={styles.inputBox}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                                   placeholder="Repeat Password"
                                   onChangeText={(password2) => this.setState({password2})}
                                   secureTextEntry={true}
                                   placeholderTextColor="#ffffff"
                                   ref={this.state.password2}
                        />
                        <TouchableOpacity style={styles.button}
                                          onPress={this.signUp}>
                            <Text style={styles.buttonText}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    imageView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        marginTop: 50,
        marginBottom: 10,
        width: 350,
        height: 100,
        resizeMode: 'contain'
    },
    inputBox: {
        width: 300,
        height: 45,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 20,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});

export default SignUpScreen;