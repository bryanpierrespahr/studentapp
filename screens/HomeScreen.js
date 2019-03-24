import React, {Component} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home',
    };

    onPress = (screenName) => {
        this.props.navigation.navigate(screenName, {
            student: this.state.student
        });
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
                        <TouchableOpacity onPress={() => {
                            this.onPress('Dashboard')
                        }}>
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
        } else {
            return (
                <View>
                </View>
            )
        }

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
        backgroundColor: '#83C669',
        marginVertical: 8,
        borderRadius: 10,
    },

    buttonText: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500'
    }

})