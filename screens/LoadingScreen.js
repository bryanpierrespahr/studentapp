import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage
} from 'react-native'
import API from '../utils/api';

class LoadingScreen extends Component {

    retrieveToken = async () => {

        console.log("Retrieving token")

        let token = null;

        try {

            await AsyncStorage.getItem("token", (err, item) => {
                token = item
                console.log("Token : " + token)
            });

            return token;


        } catch (error) {
            console.log(error);
        }

        return token;

    }

    retrieveStudent = () => {


        console.log("Retrieving student");

        let student = null;

        try {

            AsyncStorage.getItem("studentId", (err, item) => {
                var studentId = item
            });

            console.log("Student id token = " + studentId)

            if (studentId == null) {
                console.log("student id is null")
                return student
            } else {
                API.getStudent(studentId)
                    .then((data) => {
                        student = data.data;
                        console.log("student => :" + JSON.stringify(student))
                    })
                    .then(() => {
                        return student;
                    })
            }


        } catch
            (error) {
            console.log("Error retrieving student");
            return null;
        }

        //return student;

    }
    isAuth = () => {

        console.log(AsyncStorage.getItem('token'))
        return (AsyncStorage.getItem('token') !== null);
    }

    componentDidMount() {

        // this.props.navigation.navigate('Auth')

        //console.log("Component LoadingScreen Mounted");
        //
        // const token = this.retrieveToken();
        //
        // //const token = null;
        //
        // if (token != null) {

        // console.log("token not null")
        //

        // const student = this.retrieveStudent();

        //console.log("Stringified student :" + JSON.stringify(student))

        // if (student != null) {
        //     console.log("Student " + student);
        //     console.log("Navigating to the app")
        //     this.props.navigation.navigate('App', {
        //         student: student
        //     })
        // } else {
        //     this.props.navigation.navigate('Auth')
        // }
        // } else {
        //     console.log("token null")
        //     this.props.navigation.navigate('Auth')
        // }

        // if (this.isAuth) {
        //     this.props.navigation.navigate('Dashboard', {
        //         student: student
        //     })
        // } else {
        //
        //     this.props.navigation.navigate('Auth')
        // }

        var student = null;


        API.getStudent("5c8cbfb9c50d210018252a17")
            .then((data) => {
                student = data.data;
                this.props.navigation.navigate('Home', {
                    student: student
                })
            })



        // //TODO : production
        // var student = this.retrieveStudent();
        //
        // console.log("REsp : " + student);
        //
        // if(student == null){
        //     this.props.navigation.navigate('Auth')
        // }else{
        //     this.props.navigation.navigate('Home',{
        //         student: student
        //     })
        // }


    }

    //TODO : before deploying


    //var student = null;

    //TODO : uncomment
    // fetch("http://192.168.0.102:3001/student/5bebf038a58c013f583b38c1")
    //     .then((response) => response.json())
    //     .then((json) => {
    //         console.log(json);
    //         student = json;
    //     }).then(() => {
    //
    //     this.props.navigation.navigate('Home', {
    //         student: student
    //     })
    // })


    // const student = {
    //     _id: '5bebf038a58c013f583b38c1',
    //     number: 'a1802157',
    //     firstName: 'Bryan',
    //     lastName: 'Spahr',
    //     email: '1',
    //     password: 'sha1$9d139bb8$1$dc6b97e7f24011dba676a4141fa0ed72df6f6e5c',
    //     courses: [
    //         {
    //             _id: '5bebef1079ec1605e5784321',
    //             courseId: '5bebee74e4e0e774e4eb6982',
    //             results: 0,
    //             timeSpent: 0
    //         }
    //     ],
    // };
    //
    // this.props.navigation.navigate('Home', {
    //     student: student
    // })

    render() {

        console.log("RENDER")

        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}

export default LoadingScreen;

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center'
        },
    })