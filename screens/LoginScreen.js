import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView
} from 'react-native';

class LoginScreen extends Component {

    login = () => {

        console.log("Signing in");

        this.props.navigation.navigate('App');

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
                               placeholder="Email"
                               placeholderTextColor="#ffffff"
                               selectionColor="#fff"
                               keyboardType="email-address"
                               onSubmitEditing={() => this.password.focus()}
                    />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder="Password"
                               secureTextEntry={true}
                               placeholderTextColor="#ffffff"
                               ref={(input) => this.password = input}
                    />
                    <TouchableOpacity style={styles.button}
                                      onPress={this.props.login}>
                        <Text style={styles.buttonText}>{this.props.type}</Text>
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
    imageView:{
        flex: 1,
    },
    form: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    image: {
        marginTop: 50,
        width: 350,
        height: 100,
    },
    inputBox: {
        width: 300,
        height: 40,
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

export default LoginScreen;