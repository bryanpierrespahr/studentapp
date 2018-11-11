import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Button
} from 'react-native'
import Filler from './Filler';

class ProgressBar extends Component {


    constructor(props) {
        super(props);
        this.state = {
            percentage: this.props.percentage
        }
    }

    render() {

        if (this.state.percentage != null) {
            return (
                <View style={styles.progressbar}>
                    <Filler percentage={this.state.percentage}/>
                </View>
            )
        }
        return null;
    }
}


export default ProgressBar;

const styles = StyleSheet.create({
    progressbar: {
        position: 'absolute',
        height: '25%',
        width: '100%',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#333',
        backgroundColor: 'white',
    },

})