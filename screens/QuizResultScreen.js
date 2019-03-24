import React, {Component} from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import Checkbox from 'react-native-modest-checkbox';
import Entypo from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

class QuizResultScreen extends Component {

    renderQuestion = ({item, index}) => {

        return (

            <View style={styles.questions}>
                <Text>{item.question}</Text>
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
                        checkedComponent={<IoniconsIcon name="ios-checkbox" size={26} color="green"/>}
                        uncheckedComponent={<IoniconsIcon name="ios-checkbox" size={26} color="green"/>}
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
                        checkedComponent={<IoniconsIcon name="ios-checkbox" size={26} color="blue"/>}
                        uncheckedComponent={<IoniconsIcon name="ios-checkbox" size={26} color="blue"/>}
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

        var percentage = (this.state.correctNumber / this.state.questions.length) * 100;

        this.setState({
            percentage: percentage
        })
    }

    checkAnswers = () => {

        var correct = 0;
        var incorrect = 0;

        for (var i = 0; i < this.state.questions.length; i++) {

            if (this.state.correctAnswers.includes(this.state.studentAnswers[i])) {
                correct++;
                this.setState({
                    correctNumber: correct
                }, () => this.calculPercentage())
            }
            else {
                incorrect++;
                this.setState({
                    incorrectNumber: incorrect
                }, () => this.calculPercentage())
            }
        }

    }

    getResults = () => {

        const student = this.state.student;
        const studentCourses = this.state.student.courses;
        const currentCourseId = this.state.course._id;
        const currentQuizId = this.state.quiz._id;

        var index = studentCourses.findIndex(c => {
            return c.courseId == currentCourseId
        })

        const course = studentCourses[index];


        var indexQuiz = course.quizResults.findIndex(q => {
            return q.quizId == currentQuizId
        })

        const questions = course.quizResults[indexQuiz].questions;
        const answers = course.quizResults[indexQuiz].answers;
        const correctAnswers = course.quizResults[indexQuiz].correctAnswers;
        const studentAnswers = course.quizResults[indexQuiz].studentAnswers;

        this.setState({
            questions: questions,
            answers: answers,
            correctAnswers: correctAnswers,
            studentAnswers: studentAnswers,
        }, () => this.checkAnswers())

    }

    constructor(props) {
        super(props);
        this.state = {
            student: null,
            course: null,
            quiz: null,
            questions: [],
            answers: [],
            correctAnswers: [],
            studentAnswers: [],
            incorrectNumber: 0,
            correctNumber: 0
        };
    }

    componentDidMount() {

        const student = this.props.navigation.getParam('student', 'default');
        const course = this.props.navigation.getParam('course', 'default');
        const quiz = this.props.navigation.getParam('quiz', 'default')

        this.setState({
            student: student,
            course: course,
            quiz: quiz
        }, () => this.getResults());

    }

    render() {

        const percentage = (this.state.correctNumber / this.state.questions.length) * 100;
        const roundedPercentage = Number(percentage).toFixed(2);


        if (this.state.questions != null) {

            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text>Results : {this.state.correctNumber} of {this.state.questions.length}</Text>
                        <Text>Percentage : {roundedPercentage} %</Text>
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

console.disableYellowBox = true;