import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native'

class DashboardScreen extends Component {

    static navigationOptions = {
        title: 'Dashboard',
    };

    onPress = (course) => {

        this.props.navigation.navigate('Course', {
            course: course,
            weeks: course.weeks,
        });


    }
    keyExtractor = (item) => {
        return item.code
    }

    constructor(props) {
        super(props);
        this.state = {courses: [], selectedCourse: null};
    }

    render() {

        const courses = [
            {
                name: 'Digital Service Design',
                code: 'DIG4TF021',
                scope: '5 ECTS',
                timing: '3rd Semester',
                language: 'English',
                level: 'Profile studies',
                type: 'Elective',
                objective: 'Upon successful completion of this course, ' +
                'the student should be able to understand how to create better services by utilizing existing ' +
                'technologies and API’s along with graphical design theories and principles.',
                teacher :{
                    name:'Amir Dirin',
                    email: 'amir.dirin@haaga-helia.fi'
                },
                weeks: [
                    {
                        weekId: 1,
                        weekLectures: [
                            {
                                id: 1,
                                no: 1,
                                title: 'PDF 1',
                                link: 'exampleFile1',
                                type: 'lecture'
                            },
                            {
                                id: 2,
                                no: 1,
                                title: 'PDF 2',
                                link: 'exampleFile2',
                                type: 'lecture'
                            },
                            {
                                id: 3,
                                no: 2,
                                title: 'PDF 3',
                                link: 'exampleFile3',
                                type: 'lecture'
                            }
                        ],
                        weekLinks: [
                            {
                                linkId: 1,
                                linkNo: 1,
                                title: 'What is Service Design',
                                link: 'https://boagworld.com/digital-strategy/service-design/',
                                type: 'link'
                            },
                            {
                                linkId: 2,
                                linkNo: 2,
                                title: 'The rise of Digital Service Design',
                                link: 'https://clearleft.com/posts/the-rise-of-digital-service-design',
                                type: 'link'
                            }
                        ],
                        weekQuizzes: [
                            {
                                id: 1,
                                no: 1,
                                title: 'Quiz 1',
                                type: 'quiz'
                            },
                            {
                                id: 2,
                                no: 2,
                                title: 'Quiz 2',
                                type: 'quiz'
                            },
                        ]
                    },
                    {
                        weekId: 2,
                        weekLectures: [
                            {
                                id: 4,
                                no: 1,
                                title: 'PDF 4',
                                link: 'exampleFile4',
                                type: 'lecture'
                            }
                        ],
                        weekLinks: [
                            {
                                linkId: 3,
                                linkNo: 1,
                                title: 'Taxonomy of Digital Service Design',
                                link: 'https://aisel.aisnet.org/cgi/viewcontent.cgi?referer=https://www.google.com/&httpsredir=1&article=1064&context=icis2016',
                                type: 'link'
                            }
                        ],
                        weekQuizzes: [
                            {
                                id: 3,
                                no: 1,
                                title: 'Quiz 1',
                                type: 'quiz'
                            }
                        ]
                    }
                ]

            }, {
                name: 'Mobile Programming',
                code: 'SWD4TF020',
            }, {
                name: 'Business Intelligence',
                code: 'BUS8TF017',
            }, {
                name: 'Front End Development',
                code: 'SWD4TF022',
            }, {
                name: 'Future Learning Research',
                code: 'PRO8TF100-3001',
            }, {
                name: 'Linux Basics',
                code: 'DAT8TF063',
            }];

        return (
            <View style={styles.container}>
                <FlatList
                    data={courses}
                    keyExtractor={this.keyExtractor}
                    renderItem={({item}) =>
                        <TouchableOpacity onPress={() => this.onPress(item)}>
                            <View>
                                <Text>
                                    {item.name}
                                </Text>
                            </View>
                        </TouchableOpacity>}
                />
            </View>
        )
    }

}

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})