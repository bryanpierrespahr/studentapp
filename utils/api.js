import axios from 'axios';
import AsyncStorage from 'react-native';

const headers = {
    'Content-Type': 'application/json'
}

const burl = "http://backend-backend.7e14.starter-us-west-2.openshiftapps.com";

export default {

    login: function (email, password) {
        return axios.post(burl + '/student/login', {
            'email': email,
            'password': password
        }, {
            headers: headers
        })
    },
    signUpStudent: function (student) {
        return axios.post(burl + '/student/signup', student, {headers: headers})
    },

    signUpUser: function (user) {
        return axios.post(burl + '/user/signup', user, {headers: headers})
    },

    isAuth: function () {
        return (AsyncStorage.getItem('token') !== null);
    },

    logout: function () {
        AsyncStorage.clear();
    },

    getStudent: function (studentId) {
        return axios.get(burl + "/student/" + studentId)
    },

    getCourse: function (courseId) {
        return axios.get(burl + "/course/" + courseId);
    },

    getWeek: function (weekId) {
        return axios.get(burl + "/week/" + weekId);
    },

    getLink: function (linkId) {
        return axios.get(burl + "/link/" + linkId);
    },

    getLecture: function (lectureId) {
        return axios.get(burl + "/lecture/" + lectureId);
    },

    getQuiz: function (quizId) {
        return axios.get(burl + "/quiz/" + quizId);
    },

    getTeacher: function (teacherId) {
        return axios.get(burl + "/teacher/" + teacherId);
    },

    patchTimeSpent: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    },

    patchTimeSpentLecture : function(lectureId, timeSpent){

        return axios.patch(burl + "/lecture/" + lectureId, [{
                "propName": "timeSpent", "value": timeSpent
            }]
            , {
                headers: headers
            })
    },

    patchTimeSpentLink : function(linkId, timeSpent){

        return axios.patch(burl + "/link/" + linkId, [{
                "propName": "timeSpent", "value": timeSpent
            }]
            , {
                headers: headers
            })
    },

    patchTimeSpentQuiz : function(quizId, timeSpent){

        return axios.patch(burl + "/quiz/" + quizId, [{
                "propName": "timeSpent", "value": timeSpent
            }]
            , {
                headers: headers
            })
    },

    patchDoneArray: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    },

    patchPercentage: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    },

    patchQuizResult: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    },

    patchQuizQuestionsStats: function (quizId, questions) {
        return axios.patch(burl + "/quiz/" + quizId, [{
                "propName": "questions", "value": questions
            }]
            , {
                headers: headers
            })
    },

    patchGlobalScore: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    },

    patchStudentCourses: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    },

    patchCourseStudents: function (courseId, students) {
        return axios.patch(burl + "/course/" + courseId, [{
                "propName": "students", "value": students
            }]
            , {
                headers: headers
            })
    },


}