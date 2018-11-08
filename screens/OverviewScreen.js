import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    FlatList
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

class OverviewScreen extends Component {

    static navigationOptions = ({navigation}) => {

        return {
            headerTitle: 'Overview',
            // headerTitle: navigation.getParam('courseName', 'NO TITLE'),
            headerLeft: (
                <Icon.Button name='arrow-back'
                             backgroundColor='white'
                             color='black'
                             size={24}
                             onPress={() => navigation.state.params.goBack()}/>
            ),
        };
    };

    renderWeeks = ({item}) => (

        <View style={styles.week}>
            <FlatList
                data={item.content}
                renderItem={this.renderWeek}/>
        </View>

    );

    renderWeek = ({item}) => (

        <TouchableOpacity
            onPress={() => this.handleOnPress(item)}>
            <View>
                <Text>
                    {item.title}
                </Text>
            </View>
        </TouchableOpacity>
    )

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
        this.state = {course: null, weeks: []};
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

            return (

                <View style={styles.container}>
                    <View style={styles.head}>
                        <ImageBackground source={require('../assets/overview_background.png')}
                                         style={styles.imageBackground}>
                            <View>
                                <Text>{this.state.course.name}</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    week: {
        width: 250,
        backgroundColor: 'yellow'
    }
})