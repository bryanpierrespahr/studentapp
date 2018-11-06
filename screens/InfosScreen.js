import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

class InfosScreen extends Component{

    render() {

        return(
            <View style={styles.container}>
                <Text>InfosScreen</Text>
            </View>
        )
    }

}

export default InfosScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})