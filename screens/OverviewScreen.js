import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    FlatList
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import ProgressBar from '../components/ProgressBar';
import API from '../utils/api';

class OverviewScreen extends Component {

    static navigationOptions = ({navigation}) => {

        return {
            headerTitle: 'Overview',
            // headerTitle: navigation.getParam('courseName', 'NO TITLE'),
            headerLeft: (
                <MaterialIcon.Button name='arrow-back'
                                     backgroundColor='white'
                                     color='black'
                                     size={24}
                                     onPress={() => navigation.state.params.goBack()}/>
            ),
        };
    };

    renderWeeks = ({item, index}) => (


        <View style={styles.week}>
            <Text style={styles.weekTitle}>Week {index + 1}</Text>
            <FlatList
                data={item.content}
                renderItem={this.renderWeek}
                keyExtrator={(item, index) => index.toString()}
            />
        </View>

    );

    renderWeek = ({item}) => {


        switch (item.type) {
            case 'lecture':
                return (
                    <TouchableOpacity
                        onPress={() => this.handleOnPress(item)}>
                        <View style={styles.inline}>
                            <OcticonsIcon
                                style={styles.ic}
                                name='file-pdf'
                                backgroundColor='white'
                                color='black'
                                size={16}/>
                            <Text style={styles.weekContent}>
                                {item.title}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
                break;
            case 'quiz':
                return (
                    <TouchableOpacity
                        onPress={() => this.handleOnPress(item)}>
                        <View style={styles.inline}>
                            <SimpleLineIconsIcon
                                style={styles.ic}
                                name='question'
                                backgroundColor='white'
                                color='black'
                                size={16}/>
                            <Text style={styles.weekContent}>
                                {item.title}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
                break;
            case 'link':
                return (
                    <TouchableOpacity
                        onPress={() => this.handleOnPress(item)}>
                        <View style={styles.inline}>
                            <IoniconsIcon
                                style={styles.ic}
                                name='ios-link'
                                backgroundColor='white'
                                color='black'
                                size={16}/>
                            <Text style={styles.weekContent}>
                                {item.title}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
                break;
        }

    }


    handleOnPress = (item) => {

        switch (item.type) {
            case 'link':
                this.openLinkInWebView(item)
                break;
            case 'lecture':
                this.openPDFInWebView(item)
                break;
            case 'quiz':
                this.openQuiz(item)
                break;
        }
    }

    openQuiz = (quiz) => {

        const nav = this.props.screenProps.navigation;

        nav.navigate('Quiz', {
            quiz: quiz,
            course: this.state.course
        })
    }

    openLinkInWebView = (link) => {

        const nav = this.props.screenProps.navigation;

        nav.navigate('WebView', {
            title: link.title,
            uri: link.link
        });

    }

    openPDFInWebView = (pdf) => {

        const nav = this.props.screenProps.navigation;

        nav.navigate('WebView', {
            title: pdf.title,
            uri: pdf.link
        })
    }


    getWeeks = () => {

        const weeksId = this.state.course.weeksId;


        var weeks = [];
        var fetches = [];

        for (var i = 0; i < weeksId.length; i++) {
            fetches.push(
                fetch("http://192.168.1.100:3001/week/" + weeksId[i])
                    .then((response) => response.json())
                    .then((week) => {
                        var week = week;
                        weeks.push(week);
                        this.getLectures(week.lecturesId);
                        this.getLinks(week.linksId);
                        this.getQuizzes(week.quizzesId);
                    })
            )
        }

        Promise.all(fetches).then(() => {

            this.setState({
                weeks: weeks
            }, () => this.setCounter())
        })

    }

    setCounter = () => {

        var count = 0;

        const weeks = this.state.weeks;

        for (var z = 0; z < weeks.length; z++) {
            for (var y = 0; y < weeks[z].lecturesId.length; y++) {
                count++;
            }
            for (var r = 0; r < weeks[z].linksId.length; r++) {
                count++;
            }
            for (var v = 0; v < weeks[z].quizzesId.length; v++) {
                count++;
            }
        }

        this.setState({
            counter: count
        })
    }

    getLectures = (lecturesId) => {


        var currentCounter = 0;
        var lectures = this.state.lectures;
        var fetches = [];

        for (var i = 0; i < lecturesId.length; i++) {
            fetches.push(
                fetch("http://192.168.1.100:3001/lecture/" + lecturesId[i])
                    .then((response) => response.json())
                    .then((lecture) => {
                        currentCounter++;
                        var lec = lecture;
                        lectures.push(lec);
                    }));
        }

        Promise.all(fetches).then(() => {

            this.setState({
                lectures: lectures,
                currentCounter: this.state.currentCounter + currentCounter
            })

        })

    }

    getQuizzes = (quizzesId) => {

        var quizzes = this.state.quizzes;
        var fetches = [];
        var currentCounter = 0;


        for (var i = 0; i < quizzesId.length; i++) {
            fetches.push(
                fetch("http://192.168.1.100:3001/quiz/" + quizzesId[i])
                    .then((response) => response.json())
                    .then((quiz) => {
                        currentCounter++;
                        var q = quiz;
                        quizzes.push(q);
                    }));
        }

        Promise.all(fetches).then(() => {

            this.setState({
                quizzes: quizzes,
                currentCounter: this.state.currentCounter + currentCounter
            })

        })

    }

    getLinks = (linksId) => {

        var links = this.state.links;
        var fetches = [];
        var currentCounter = 0;

        for (var i = 0; i < linksId.length; i++) {
            fetches.push(
                fetch("http://192.168.1.100:3001/link/" + linksId[i])
                    .then((response) => response.json())
                    .then((link) => {
                        currentCounter++;
                        var lk = link;
                        links.push(lk);
                    }));
        }

        Promise.all(fetches).then(() => {

            this.setState({
                links: links,
                currentCounter: this.state.currentCounter + currentCounter
            })
        })

    }


    constructor(props) {
        super(props);
        this.state = {course: null, student: null, percentage: 50, weeks: [], lectures: [], quizzes: [], links: [], counter: -1, currentCounter: 0};
    }

    componentDidMount() {


        this.props.navigation.setParams({
            goBack: this.goBackToDashboard.bind(this),
            course: this.props.screenProps.course,
        });

        this.setState({
            course: this.props.screenProps.course,
            //weeks: this.props.screenProps.weeks,
            student: this.props.screenProps.student,
        }, () => this.getWeeks())

        const student = this.props.screenProps.student;
        const course = this.props.screenProps.course;

        var abc = student.courses.filter(c => {
            console.log(c.courseId);
            console.log(course._id);
            return c.courseId == course._id
        })

        this.setState({
            percentage: abc[0].percentage
        })

    }

    goBackToDashboard() {

        const nav = this.props.screenProps.navigation;
        nav.navigate('Dashboard');

    }

    render() {


        if (this.state.course != null && this.state.counter == this.state.currentCounter) {


            //Array of weeks
            const weeks = this.state.weeks;
            const lectures = this.state.lectures;
            const links = this.state.links;
            const quizzes = this.state.quizzes;

            for (var i = 0; i < weeks.length; i++) {

                //Create an array for content
                var content = [];

                for (var z = 1; z < 6; z++) {

                    //Loop through lectures array
                    for (let a = 0; a < lectures.length; a++) {

                        //if no = current no
                        if (lectures[a].weekNo == (i + 1) && lectures[a].no == z) {
                            content.push(lectures[a])
                        }
                    }

                    //Loop through lectures array
                    for (let b = 0; b < links.length; b++) {

                        //if no = current no
                        if (links[b].weekNo == (i + 1) && links[b].no == z) {
                            content.push(links[b])
                        }
                    }

                    //Loop through quizzes array
                    for (let c = 0; c < quizzes.length; c++) {

                        //if no = current no
                        if (quizzes[c].weekNo == (i + 1) && quizzes[c].no == z) {
                            content.push(quizzes[c])
                        }
                    }

                }

                //Add content property & array to the week
                weeks[i].content = content;

                //Empty array
                content = [];
            }

            const course = this.state.course;

            return (
                <View style={styles.container}>
                    <View style={styles.head}>
                        <ImageBackground source={require('../assets/overview_background.png')}
                                         style={styles.imageBackground}>
                            <View styles={styles.textHeader}>
                                <Text style={styles.courseTitle}>{course.name}</Text>
                            </View>
                            <View style={styles.textFooter}>
                                <View style={styles.progress}>
                                    <ProgressBar percentage={this.state.percentage}/>
                                </View>
                                <View style={styles.schedule}>
                                    <Text style={styles.details}>{course.schedule.day}</Text>
                                    <Text style={styles.details}>{course.schedule.hour}</Text>
                                    <Text style={styles.details}>Room {course.schedule.room}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.body}>
                        <FlatList
                            data={weeks}
                            horizontal={true}
                            renderItem={this.renderWeeks}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            )
        }

        return null;

    }

}

export default OverviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    head: {
        flex: 30,
    },
    body: {
        flex: 70,
    },
    imageBackground: {
        flex: 1,
        alignSelf: 'center',
        position: 'relative',
    },
    courseTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 25,
    },
    textHeader: {
        flex: 1,
    },
    textFooter: {
        flex: 1,
        flexDirection: 'row',
    },
    progress: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    schedule: {
        flex: 1,
        marginLeft: 20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    details: {
        alignSelf: 'flex-start',
        fontSize: 17,
        fontWeight: '500',
    },
    week: {
        width: 250,
        backgroundColor: '#DCDCDC',
        marginHorizontal: 8,
        marginTop: 10,
    },
    weekTitle: {
        fontSize: 16,
        fontWeight: '600',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        marginVertical: 3,
    },
    weekContent: {
        fontSize: 15,
        paddingLeft: 8,

    },
    inline: {
        marginVertical: 2,
        paddingHorizontal: 10,
        flexDirection: 'row'
    },
    ic: {
        paddingTop: 5,
    }
})