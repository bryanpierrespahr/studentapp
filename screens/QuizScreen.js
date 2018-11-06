import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
class QuizScreen extends Component{

    render() {

        return(
            <View style={styles.container}>
                <Text>QuizScreen</Text>
            </View>
        )
    }

}

export default QuizScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})