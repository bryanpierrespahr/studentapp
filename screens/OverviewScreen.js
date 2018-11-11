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
                renderItem={this.renderWeek}/>
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


    constructor(props) {
        super(props);
        this.state = {course: null, weeks: [], percentage: 0};
    }

    componentDidMount() {


        this.props.navigation.setParams({
            goBack: this.goBackToDashboard.bind(this),
            course: this.props.screenProps.course
        });

        this.setState({
            course: this.props.screenProps.course,
            weeks: this.props.screenProps.weeks
        })

        //TODO: Get this value from the DB via server
        this.setState({
            percentage: 70
        })

    }


    goBackToDashboard() {

        const nav = this.props.screenProps.navigation;
        nav.navigate('Dashboard');

    }

    render() {

        if (this.state.course != null) {

            //Array of weeks
            const weeks = this.state.weeks;

            //Create an arry for content
            var content = [];

            //Loop through each weeks
            for (let i = 0; i < weeks.length; i++) {

                //if there is lectures for this week
                if (weeks[i].weekLectures != null) {

                    var lectures = [];

                    //Loop through lectures array
                    for (let j = 0; j < weeks[i].weekLectures.length; j++) {
                        lectures.push(weeks[i].weekLectures[j])
                    }
                }

                //if there is links for this week
                if (weeks[i].weekLinks != null) {

                    var links = [];

                    //Loop through links array
                    for (let k = 0; k < weeks[i].weekLinks.length; k++) {
                        links.push(weeks[i].weekLinks[k])
                    }
                }

                //if there is quizzes for this week
                if (weeks[i].weekQuizzes != null) {

                    var quizzes = [];

                    //Loop through quizzes array
                    for (let l = 0; l < weeks[i].weekQuizzes.length; l++) {
                        quizzes.push(weeks[i].weekQuizzes[l])
                    }
                }

                //No
                for (let z = 1; z < 6; z++) {


                    //Loop through lectures array
                    for (let a = 0; a < lectures.length; a++) {

                        //if no = current no
                        if (lectures[a].no == z) {
                            content.push(lectures[a])
                        }
                    }


                    //Loop through links array
                    for (let b = 0; b < links.length; b++) {

                        //if linkNo = current no
                        if (links[b].linkNo == z) {
                            content.push(links[b])
                        }
                    }


                    //Loop through quizzes array
                    for (let c = 0; c < quizzes.length; c++) {

                        //if no = current no
                        if (quizzes[c].no == z) {
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