import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage
} from 'react-native'
import API from '../utils/api';

class LoadingScreen extends Component {

    retrieveToken = () => {

        let token = null;

        try {

            AsyncStorage.getItem("token", (err, item) => {
                token = item
            });
            return token;


        } catch (error) {
            console.log("Error retrieving token");
        }

        return token;

    }

    retrieveStudent = () => {

        let student = null;

        try {

            AsyncStorage.getItem("student", (err, item) => {
                student = item
            });
            return JSON.parse(student);

        } catch (error) {
            console.log("Error retrieving student");
        }
        return student;

    }


    componentDidMount() {

        //TODO : uncomment when deploying
        // const token = this.retrieveToken();
        //
        // if (token != null) {
        //
        //     const student = this.retrieveStudent();
        //
        //     if (student != null) {
        //         console.log("Student " + student);
        //         this.props.navigation.navigate('App', {
        //             student: student
        //         })
        //     } else {
        //         this.props.navigation.navigate('Auth')
        //     }
        // } else {
        //     this.props.navigation.navigate('Auth')
        // }
        //
        // if(API.isAuth()) {
        //     this.props.navigation.navigate('Dashboard', {
        //         student: student
        //     })
        // }else{
        //     this.props.navigation.navigate('Auth')
        // }

        //TODO : brefore deploying


        var student = null;

        fetch("http://192.168.1.100:3001/student/5bebf038a58c013f583b38c1")
            .then((response) => response.json())
            .then((json) => {
                student = json;
            }).then(() => {

            this.props.navigation.navigate('Dashboard', {
                student: student
            })
        })

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

    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
})