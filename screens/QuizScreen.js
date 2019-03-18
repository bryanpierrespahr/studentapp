import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import API from "../utils/api";

class QuizScreen extends Component {

    shuffle = (array) => {

        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

    onSelect = (index, value, q) => {

        var answersCopy = this.state.studentAnswers;
        answersCopy[q] = value;

        this.setState({
            studentAnswers: answersCopy
        })
    }

    submit = () => {

        this.saveQuizResult();

        this.props.navigation.navigate('QuizResult', {
                student: this.state.student,
                course: this.state.course,
                quiz: this.state.quiz,
            }
        )

    }

    saveQuizResult = () => {

        const student = this.state.student;
        const studentCourses = this.state.student.courses;
        const currentCourseId = this.state.course._id;

        var index = studentCourses.findIndex(c => {
            return c.courseId == currentCourseId
        })

        const studentAnswers = this.state.studentAnswers;
        const correctAnswers = this.state.correctAnswers;

        var quizResult = {
            quizId: this.state.quiz._id,
            questions: this.state.questions,
            answers: this.state.answers,
            studentAnswers: studentAnswers,
            correctAnswers: correctAnswers
        }

        studentCourses[index].quizResults.push(quizResult);

        var correctAns = 0;

        for (var u = 0; u < correctAnswers.length; u++) {
            if (correctAnswers[u] == studentAnswers[u]) {
                correctAns++;
            }
        }

        var quizScore = (correctAns / correctAnswers.length) * 100;

        var globalResult = {
            title: this.state.quiz.title,
            score: quizScore,
            quizId: this.state.quiz._id,
        }

        studentCourses[index].globalResults.push(globalResult);

        const globalResults = studentCourses[index].globalResults;

        var totalScore = 0;

        for (var g = 0; g < studentCourses[index].globalResults.length; g++) {
            totalScore += studentCourses[index].globalResults[g].score;
        }

        var avgScore = (totalScore / globalResults.length);

        studentCourses[index].globalScore = avgScore;

        API.patchQuizResult(student._id, studentCourses)
            .then((response) => {
                console.log(response.data)
            })


        //Updating quiz questions stats

        var questions = this.state.questions;

        for (var i = 0; i < questions.length; i++) {
            if (studentAnswers[i] == correctAnswers[i])
                questions[i].nbCorrect = questions[i].nbCorrect + 1;
            else {
                questions[i].nbIncorrect = questions[i].nbIncorrect + 1;
            }
        }


    }
    saveTimeSpent = (timeSpent) => {

        console.log("SAVING time spent")
        console.log("Time spent " + timeSpent)

        const studentId = this.state.student._id;
        const currentCourseId = this.state.course._id;
        const quiz = this.state.quiz;

        var index = this.state.student.courses.findIndex(c => {
            return c.courseId == currentCourseId
        })


        var indexId = this.state.student.courses[index].done.findIndex(d => {
            return d.id == quiz._id
        })


        const courses = this.state.student.courses;
        courses[index].done[indexId].timeSpent += timeSpent;


        API.patchTimeSpent(studentId, courses)
            .then((response) => {

            })
            .catch(error => {
                console.error(error)
            })

        var newTimeSpent;


        API.getQuiz(quiz._id)
            .then((data) => {
                var quiz = data.data;
                var ts = quiz.timeSpent;
                if (ts == null)
                    ts = 0
                newTimeSpent = ts + timeSpent;
            })
            .then(() => {
                API.patchTimeSpentQuiz(quiz._id, newTimeSpent)
                    .then((data) => {
                        console.log(data.data)
                    })
            })


    }

    constructor(props) {
        super(props);
        this.state = {
            course: null,
            quiz: null,
            questions: [],
            studentQuestions: [],
            studentAnswers: [],
            correctAnswers: [],
            allAnswers: [],
            firstTime: true,
            openedAt: null,
            closedAt: null,
            timeSpent: 0,
        };
    }

    componentDidMount() {

        this.props.navigation.setParams({
            goBack: this.goBackToDashboard.bind(this)
        });

        this.setState({
            course: this.props.navigation.getParam('course', 'NO-COURSE'),
            student: this.props.navigation.getParam('student', 'default'),
            quiz: this.props.navigation.getParam('quiz', 'default')
        }, () =>   console.log("QUIZ : "+JSON.stringify(this.state.quiz)))


        var openedAt = new Date();

        this.setState({
            openedAt: openedAt
        })
    }

    componentWillUnmount() {

        var closedAt = new Date();

        var timeSpent = (closedAt.getTime() - this.state.openedAt.getTime()) / 1000;


        this.saveTimeSpent(timeSpent);

    }

    goBackToDashboard() {
        this.props.navigation.navigate('Dashboard');
    }

    render() {

        if (this.state.firstTime && this.state.quiz != null) {

            const quiz = this.state.quiz;

            var allAnswers = [];
            var allQuestions = [];
            var correctAns = [];

            //Loop through quiz
            for (let i = 0; i < quiz.questions.length; i++) {

                allQuestions.push(quiz.questions[i].question);

                console.log("QUESTION QUESTION "+quiz.questions[i].question);
                console.log("QUESTION QUESTION "+quiz.questions[i].question);
                console.log("QUESTION QUESTION "+quiz.questions[i].question);
                console.log("QUESTION QUESTION "+quiz.questions[i].question);
                console.log("QUESTION QUESTION "+quiz.questions[i].question);
                console.log("QUESTION QUESTION "+quiz.questions[i].question);
                console.log("QUESTION QUESTION "+quiz.questions[i].question);
                console.log("QUESTION QUESTION "+quiz.questions[i].question);

                var answers = [];

                correctAns.push(quiz.questions[i].correctAnswer);
                answers.push(quiz.questions[i].correctAnswer);
                //Loop through answers
                for (let j = 0; j < 3; j++) {

                    answers.push(quiz.questions[i].incorrectAnswers[j]);
                }

                answers = this.shuffle(answers);

                allAnswers = allAnswers.concat(answers);
            }

            var resultQuiz = [];
            var quest = {};
            var answ = [];

            //Loop through all answers;
            for (let z = 0; z <= allAnswers.length; z++) {

                if (z % 4 == 0 && z != 0) {

                    var quest = {};
                    quest.question = allQuestions[(z - 4) / 4];
                    quest.answers = answ;
                    resultQuiz.push(quest);
                    answ = [];
                    quest = {};
                }

                answ.push(allAnswers[z]);
            }

            //const shuffledQuestions = this.shuffle(resultQuiz);

            this.setState({
                questions: resultQuiz,
                correctAnswers: correctAns,
                firstTime: false,
                allAnswers: allAnswers
            })
        }


        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <FlatList
                        data={this.state.questions}
                        renderItem={({item, index}) =>
                            <View style={styles.questions}>
                                <Text>{item.question}</Text>
                                <RadioGroup
                                    onSelect={(i, value) => this.onSelect(i, value, index)}
                                >
                                    <RadioButton value={item.answers[0]}>
                                        <Text>{item.answers[0]}</Text>
                                    </RadioButton>

                                    <RadioButton value={item.answers[1]}>
                                        <Text>{item.answers[1]}</Text>
                                    </RadioButton>

                                    <RadioButton value={item.answers[2]}>
                                        <Text>{item.answers[2]}</Text>
                                    </RadioButton>

                                    <RadioButton value={item.answers[3]}>
                                        <Text>{item.answers[3]}</Text>
                                    </RadioButton>
                                </RadioGroup>
                            </View>
                        }/>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={this.submit}
                    >
                        <Text style={styles.textButton}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

export default QuizScreen;

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