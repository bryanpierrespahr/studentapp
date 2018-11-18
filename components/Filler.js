import React, {Component} from 'react'
import {
    View,
    Text, StyleSheet
} from 'react-native'

class Filler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            percentage: 0
        }
    }

    componentDidMount() {

        this.setState({
            percentage: this.props.percentage
        })
    }

    componentWillReceiveProps(nextProps) {

        this.setState({percentage: nextProps.percentage});
    }

    render() {

        return (
            <View style={{
                width: `${this.state.percentage}%`,
                backgroundColor: 'green',
                height: '100%',
                borderRadius: 40,
            }}>
                <Text style={styles.percentage}>{this.state.percentage}%</Text>
            </View>
        )
    }
}

export default Filler;

const styles = StyleSheet.create({

    percentage: {
        alignSelf: 'flex-end',
        paddingRight: 5,
        fontWeight: '500',
    }
})