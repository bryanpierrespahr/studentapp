import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
class OverviewScreen extends Component{

    render() {

        return(
            <View style={styles.container}>
                <Text>OverviewScreen</Text>
            </View>
        )
    }

}

export default OverviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})