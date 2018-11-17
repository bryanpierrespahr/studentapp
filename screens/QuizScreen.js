import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

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

        // console.log("SUBMITTED");
        // console.log("Student answres : " + this.state.studentAnswers)
        // console.log("Correct answres : " + this.state.correctAnswers)

        console.log("questions  :"+JSON.stringify(this.state.questions))

        this.props.navigation.navigate('QuizResult', {
                questions: this.state.questions,
                answers: this.state.allAnswers,
                studentAnswers: this.state.studentAnswers,
                correctAnswers: this.state.correctAnswers,
            }
        )

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
            firstTime: true
        };
    }

    componentDidMount() {

        console.log("QUIZ " + this.props.navigation.getParam('quiz', 'error'))


        this.props.navigation.setParams({
            goBack: this.goBackToDashboard.bind(this)
        });

        this.setState({
            course: this.props.navigation.getParam('course', 'NO-COURSE'),
            quiz: this.props.navigation.getParam('quiz', 'default')
        })
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

                allQuestions.push(quiz.questions[i].title);
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
                    quest.title = allQuestions[(z - 4) / 4];
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
                                <Text>{item.title}</Text>
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