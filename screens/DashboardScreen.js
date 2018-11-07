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
        console.log(course.name);

        this.props.navigation.navigate('Overview', {
            course: course
        });

    }

    constructor(props) {
        super(props);
        this.state = {courses: []};
    }

    keyExtractor = (item) => {
        console.log(item.code);
        return item.code
    }

    render() {

        const courses = [
            {
                name: 'Digital Service Design',
                code: 'DIG4TF021',
                Timing: '3rd Semester',
                Language:'English',
                CourseLevel: 'Profile studies',
                CourseType: 'Elective'
            },{
                name: 'Mobile Programming',
                code: 'SWD4TF020',
            },{
                name: 'Business Intelligence',
                code: 'BUS8TF017',
            },{
                name: 'Front End Development',
                code: 'SWD4TF022',
            },{
                name: 'Future Learning Research',
                code: 'PRO8TF100-3001',
            },{
                name: 'Linux Basics',
                code: 'DAT8TF063',
            }];

        return (
            <View style={styles.container}>
                <Text>Dashboard Screen</Text>
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