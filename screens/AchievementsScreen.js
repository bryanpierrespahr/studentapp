import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

class AchievementsScreen extends Component{

    render() {

        return(
            <View style={styles.container}>
                <Text>AchievementsScreen</Text>
            </View>
        )
    }

}

export default AchievementsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})