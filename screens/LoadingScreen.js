import React, {Component} from 'react'
import {ActivityIndicator, AsyncStorage, StyleSheet, View} from 'react-native'
import API from '../utils/api';

class LoadingScreen extends Component {

    retrieveToken = async () => {


        let token = null;

        try {

            await AsyncStorage.getItem("token", (err, item) => {
                token = item

            });

            return token;


        } catch (error) {

        }

        return token;

    }

    retrieveStudent = () => {


        let student = null;
        var studentId;

        try {

            AsyncStorage.getItem("studentId", (err, item) => {
                studentId = item
            });


            if (studentId == null) {
                return null
            } else {
                API.getStudent(studentId)
                    .then((data) => {
                        student = data.data;

                    })
                    .then(() => {
                        return student;
                    })
            }


        } catch
            (error) {

            return null;
        }


    }
    isAuth = () => {

        return (AsyncStorage.getItem('token') !== null);
    }

    componentDidMount() {

        // //TODO : dev
        // // var student = null;
        // API.getStudent("5c9204ef37b8a8001a60f308")
        //     .then((data) => {
        //         student = data.data;
        //         this.props.navigation.navigate('Home', {
        //             student: student,
        //         })
        //     })


        // TODO : production
        var student = this.retrieveStudent();

        if (student == null) {
            this.props.navigation.navigate('Auth')
        } else {
            this.props.navigation.navigate('Home', {
                student: student
            })
        }

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

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center'
        },
    })