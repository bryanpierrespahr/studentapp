import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native'
import Checkbox from 'react-native-modest-checkbox';
import Entypo from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';


class QuizResultScreen extends Component {

    renderQuestion = ({item, index}) => {

        return (

            <View style={styles.questions}>
                <Text>{item.title}</Text>
                <FlatList
                    data={item.answers}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}/>
            </View>
        )

    }

    renderItem = ({item, index}) => {

        if (this.state.studentAnswers.includes(item) && !this.state.correctAnswers.includes(item)) {



            return (
                <View>
                    <Checkbox
                        style={{flex: 1, padding: 10}}
                        onChange={() => {
                        }}
                        checkedComponent={<Entypo name="squared-cross" size={26} color="red"/>}
                        uncheckedComponent={<Entypo name="squared-cross" size={26} color="red"/>}
                        label={item}
                    />
                </View>
            )

        } else if (this.state.studentAnswers.includes(item) && this.state.correctAnswers.includes(item)) {



            return (
                <View>
                    <Checkbox
                        style={{flex: 1, padding: 10}}
                        onChange={() => {
                        }}
                        checkedComponent={<IoniconsIcon name="ios-checkbox" size={26} color="blue"/>}
                        uncheckedComponent={<IoniconsIcon name="ios-checkbox" size={26} color="blue"/>}
                        label={item}
                    />
                </View>
            )

        } else if (!this.state.studentAnswers.includes(item) && this.state.correctAnswers.includes(item)) {



            return (
                <View>
                    <Checkbox
                        style={{flex: 1, padding: 10}}
                        onChange={() => {
                        }}
                        checkedComponent={<IoniconsIcon name="ios-checkbox" size={26} color="green"/>}
                        uncheckedComponent={<IoniconsIcon name="ios-checkbox" size={26} color="green"/>}
                        label={item}
                    />
                </View>
            )
        }

        else {
            return (
                <View>
                    <Checkbox
                        style={{flex: 1, padding: 10}}
                        onChange={() => {
                        }}
                        checked={false}
                        label={item}
                    />
                </View>
            )
        }

    }

    calculPercentage = () => {

        var percentage = this.state.correctNumber / this.state.questions.length * 100;

        this.setState({
            percentage: percentage
        })

    }

    checkAnswers = () => {

        console.log("CALCUL")

        var correct = 0;
        var incorrect = 0;

        for(var i = 0 ; i < this.state.questions.length; i++){

            if(this.state.correctAnswers.includes(this.state.studentAnswers[i])){
                console.log(this.state.studentAnswers[i])
                console.log("CORRECT")
                this.setState({
                    correctNumber: this.state.correctNumber+1
                }, () => this.calculPercentage())
            }
            else{
                console.log(this.state.studentAnswers[i])
                console.log("INCORRECT")
                this.setState({
                    incorrectNumber: this.state.incorrectNumber+1
                }, () => this.calculPercentage())
            }
        }

    }

    constructor(props) {
        super(props);
        this.state = {questions: [], answers: [], correctAnswers: [], studentAnswers: [], incorrectNumber: 0, correctNumber: 0};
    }

    componentDidMount() {

        this.setState({
            questions: this.props.navigation.getParam('questions', 'default'),
            answers: this.props.navigation.getParam('answers', 'default'),
            correctAnswers: this.props.navigation.getParam('correctAnswers', 'default'),
            studentAnswers: this.props.navigation.getParam('studentAnswers', 'default'),
        }, () => this.checkAnswers())
    }

    render() {

        const percentage = (this.state.correctNumber / this.state.total) * 100;


        if (this.state.questions != null) {

            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text>Results : {this.state.correctNumber} of {this.state.questions.length}</Text>
                        <Text>Percentage : {this.state.percentage} %</Text>
                    </View>
                    <View style={styles.body}>
                        <FlatList
                            data={this.state.questions}
                            renderItem={this.renderQuestion}
                            keyExtractor={(item, index) => index.toString()}/>
                    </View>
                </View>
            )


        }

        return null;

    }

}

export default QuizResultScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
    },
    questions: {
        flex: 1,
        marginVertical: 5,
        marginHorizontal: 8,
    },
    submitButton: {
        height: 42,
        color: 'red',
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },

})