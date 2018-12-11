import axios from 'axios';
import AsyncStorage from 'react-native';

const headers = {
    'Content-Type': 'application/json'
}

const burl = "http://192.168.0.102:3001";

export default {

    login: function (email, password) {
        return axios.post(burl + '/student/login', {
            'email': email,
            'password': password
        }, {
            headers: headers
        })
    },
    signup: function (send) {
        return axios.post(burl + '/user/signup', send, {headers: headers})
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

    patchGlobalScore: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    }

}