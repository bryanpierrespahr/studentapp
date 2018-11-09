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

        console.log("SUBMITTED");
        console.log(this.state.studentAnswers)

    }

    constructor(props) {
        super(props);
        this.state = {
            course: null,
            quiz: null,
            questions: [],
            studentQuestions: [],
            studentAnswers: [],
            firstTime: true
        };
    }

    componentDidMount() {

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

        if (this.state.firstTime) {

            const quiz = {
                id: 1,
                questions: [
                    {
                        id: 1,
                        title: 'Which American president appears on a one dollar bill ?',
                        correct_answer: 'George Washington',
                        incorrect_answers: [
                            'Thomas Jefferson',
                            'Abraham Lincoln',
                            'Benjamin Franklin',
                        ]
                    },
                    {
                        id: 2,
                        title: 'Which country does the YouTuber \'SinowBeats\' originate from ?',
                        correct_answer: 'Scotland',
                        incorrect_answers: [
                            'England',
                            'Sweden',
                            'Germany'
                        ]
                    },
                    {
                        id: 3,
                        title: 'In the video game \'Team Fortress 2\', which class is able to double jump ?',
                        correct_answer: 'Scout',
                        incorrect_answers: [
                            'Spy',
                            'Engineer',
                            'Pyro'
                        ]
                    },
                    {
                        id: 4,
                        title: 'In the Portal series of games, who was the founder of Aperture Science ?',
                        correct_answer: 'Cave Johnson',
                        incorrect_answers: [
                            'GLaDOs',
                            'Wallace Breen',
                            'Gordon Freeman'
                        ]
                    },
                    {
                        id: 5,
                        title: 'In the movie Gremlins, after what time of day should you not feed Mogwai ?',
                        correct_answer: 'Midnight',
                        incorrect_answers: [
                            'Evening',
                            'Morning',
                            'Afternoon'
                        ]
                    },
                    {
                        id: 6,
                        title: 'Sean Bean voices the character of "Martin Septim" in which Elder Scrolls game ?',
                        correct_answer: 'The Elder Scrolls IV: Oblivion',
                        incorrect_answers: [
                            'The Elder Scrolls V: Skyrim',
                            "The Elder Scrolls III: Morrowind ",
                            "The Elder Scrolls III: Morrowind "
                        ]
                    },
                    {
                        id: 7,
                        title: "What was the original release date of Grand Theft Auto V ?",
                        correct_answer: "September 17, 2013",
                        incorrect_answers: [
                            "August 17, 2013",
                            "April 14, 2015",
                            "November 18, 2014"
                        ]
                    },
                    {
                        id: 8,
                        title: 'Nidhogg is a mythical creature from what mythology ?',
                        correct_answer: 'Norse',
                        incorrect_answers: [
                            'Greek',
                            'Egyptian',
                            'Hindu'
                        ]
                    },
                    {
                        id: 9,
                        title: "How many sides does a heptagon have ?",
                        correct_answer: '7',
                        incorrect_answers: [
                            '8',
                            '6',
                            '5'
                        ]
                    },
                    {
                        id: 10,
                        title: "How many countries are inside the United Kingdom ?",
                        correct_answer: 'Four',
                        incorrect_answers: [
                            'Two',
                            'Three',
                            'One'
                        ]
                    }
                ]
            }

            var allAnswers = [];
            var allQuestions = [];

            //Loop through quiz
            for (let i = 0; i < quiz.questions.length; i++) {

                allQuestions.push(quiz.questions[i].title);
                var answers = [];

                answers.push(quiz.questions[i].correct_answer)
                //Loop through answers
                for (let j = 0; j < 3; j++) {

                    answers.push(quiz.questions[i].incorrect_answers[j]);
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

            const shuffledQuestions = this.shuffle(resultQuiz);

            this.setState({
                questions: shuffledQuestions,
                firstTime: false,
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
        alignItems:'center'
    },
    textButton:{
        color:'white',
        fontSize: 16,
        fontWeight: '600'
    },

})