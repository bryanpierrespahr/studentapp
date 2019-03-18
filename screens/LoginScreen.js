import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native';
import API from '../utils/api';


class LoginScreen extends Component {

    storeToken = async (student, token) => {

        const studentId = student._id;

        console.log("Storing tokens")

        try {
            await AsyncStorage.setItem("token", token);
            await AsyncStorage.setItem("studentId", studentId)

        } catch (error) {
            console.log(error);
        }
    }

    login = () => {

        console.log("LOGIN")

        API.login(this.state.email, this.state.password)
            .then((data) => {
                this.setState({
                    student: data.data.student
                }, () => this.storeToken(data.data.student, data.data.token));
            }).then(() => {
            this.props.navigation.navigate('Home', {
                student: this.state.student
            });
        })
            .catch(error => {
                console.log(error);
            })
    }

    signUpButton = () => {

        console.log("Sign up clicked");

        this.props.navigation.navigate('SignUp');

    }

    constructor(props) {
        super(props);
        this.state = {email: '', password: '', student: null}
    }


    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.imageView}>
                    <Image style={styles.image}
                           source={require('../assets/haaga-helia.png')}/>
                </View>
                <View style={styles.form}>
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
                    <TouchableOpacity style={styles.button}
                                      onPress={this.login}>
                        <Text style={styles.buttonText}>LOG IN</Text>
                    </TouchableOpacity>
                    <View style={styles.margin}></View>
                    <Text style={styles.orText}>Don't have an account yet ?</Text>
                    <TouchableOpacity style={styles.buttonSignUp}
                                      onPress={this.signUpButton}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
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
        marginTop: 20,
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
        marginTop: 20,
        marginBottom: 8,
        paddingVertical: 13
    },
    buttonSignUp:{
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        paddingVertical: 13,
        marginTop: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    orText: {
        marginTop:12,
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'left'
    }
});

export default LoginScreen;