import { createStore } from 'vuex';
import axiosClient from '../axios';

// const tmpSurveys = [
//     {
//         id: 100,
//         title: "TheCodeholic channel",
//         slug: "the-codeholic-channel",
//         status: "draft",
//         image: "https://i.picsum.photos/id/1058/200/300.jpg?hmac=KdLDQtUUGPBshA5WQaD3nZMUtdgHS9zJJ3pfoXWdjUE",
//         description: "My name is Nikolas<br> I am web developer",
//         created_at: "2022-11-10 09:00:00",
//         updated_at: "2022-11-10 09:00:00",
//         expire_date: "2022-11-20 09:00:00",
//         questions: [
//             {
//                 id: 1,
//                 type: 'select',
//                 question: 'From which country are you?',
//                 description: null,
//                 data: {
//                     options: [
//                         { uuid: "122", text: "USA" },
//                         { uuid: "123", text: "US" },
//                         { uuid: "124", text: "UK" },
//                         { uuid: "125", text: "CY" },
//                         { uuid: "126", text: "GR" },
//                     ]
//                 }
//             },
//             {
//                 id: 2,
//                 type: 'checkbox',
//                 question: 'From which country are you?',
//                 description: null,
//                 data: {
//                     options: [
//                         { uuid: "122", text: "USA" },
//                         { uuid: "123", text: "US" },
//                         { uuid: "124", text: "UK" },
//                         { uuid: "125", text: "CY" },
//                         { uuid: "126", text: "GR" },
//                     ]
//                 }
//             },
//             {
//                 id: 4,
//                 type: 'radio',
//                 question: 'From which country are you?',
//                 description: null,
//                 data: {
//                     options: [
//                         { uuid: "122", text: "USA" },
//                         { uuid: "123", text: "US" },
//                         { uuid: "124", text: "UK" },
//                         { uuid: "125", text: "CY" },
//                         { uuid: "126", text: "GR" },
//                     ]
//                 }
//             },
//             {
//                 id: 5,
//                 type: 'text',
//                 question: 'From which country are you?',
//                 description: null,
//                 data: {}
//             },
//             {
//                 id: 6,
//                 type: 'textarea',
//                 question: 'From which country are you?',
//                 description: "Decriptions........................",
//                 data: {}
//             },
//         ]
//     },
//     {
//         id: 100,
//         title: "TheCodeholic channel2",
//         slug: "the-codeholic-channel-2",
//         status: "draft",
//         image: "https://i.picsum.photos/id/1058/200/300.jpg?hmac=KdLDQtUUGPBshA5WQaD3nZMUtdgHS9zJJ3pfoXWdjUE",
//         description: "My name is Nikolas<br> I am web developer 2",
//         created_at: "2022-11-10 09:00:00",
//         updated_at: "2022-11-10 09:00:00",
//         expire_date: "2022-11-20 09:00:00",
//         questions: [
//             {
//                 id: 1,
//                 type: 'select',
//                 question: 'From which country are you?',
//                 description: null,
//                 data: {
//                     options: [
//                         { uuid: "122", text: "USA" },
//                         { uuid: "123", text: "US" },
//                         { uuid: "124", text: "UK" },
//                         { uuid: "125", text: "CY" },
//                         { uuid: "126", text: "GR" },
//                     ]
//                 }
//             },
//             {
//                 id: 2,
//                 type: 'checkbox',
//                 question: 'From which country are you?',
//                 description: null,
//                 data: {
//                     options: [
//                         { uuid: "122", text: "USA" },
//                         { uuid: "123", text: "US" },
//                         { uuid: "124", text: "UK" },
//                         { uuid: "125", text: "CY" },
//                         { uuid: "126", text: "GR" },
//                     ]
//                 }
//             },
//             {
//                 id: 4,
//                 type: 'radio',
//                 question: 'From which country are you?',
//                 description: null,
//                 data: {
//                     options: [
//                         { uuid: "122", text: "USA" },
//                         { uuid: "123", text: "US" },
//                         { uuid: "124", text: "UK" },
//                         { uuid: "125", text: "CY" },
//                         { uuid: "126", text: "GR" },
//                     ]
//                 }
//             },
//             {
//                 id: 5,
//                 type: 'text',
//                 question: 'From which country are you?',
//                 description: null,
//                 data: {}
//             },
//             {
//                 id: 6,
//                 type: 'textarea',
//                 question: 'From which country are you?',
//                 description: "Decriptions........................",
//                 data: {}
//             },
//         ]
//     },
// ]

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },
        currentSurvey: {
            loading: false,
            data: {
            }
        },
        surveys: {
            loading: false,
            data: []
        },
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
        notification: {
            show: false,
            type: null,
            message: null,
        }
    },
    getters: {},
    actions: {
        getSurveys({ commit }, id) {
            commit('setSurveysLoading', true);
            return axiosClient.get('/survey').then((res) => {
                commit('setSurveysLoading', false);
                commit('setSurveys', res.data);
                return res;
            })
        },
        getSurvey({ commit }, id) {
            commit("setCurrentSurveyLoading", true);
            return axiosClient
                .get(`/survey/${id}`)
                .then((res) => {
                    commit("setCurrentSurvey", res.data);
                    commit("setCurrentSurveyLoading", false);
                    return res;
                })
                .catch((err) => {
                    commit("setCurrentSurveyLoading", false);
                    throw err;
                })
        },
        saveSurvey({ commit }, survey) {
            delete survey.image_url;
            let response;
            if (survey.id) {
                response = axiosClient.put(`/survey/${survey.id}`, survey)
                    .then((res) => {
                        commit('setCurrentSurvey', res.data);
                        return res;
                    })
            } else {
                response = axiosClient.post(`/survey`, survey)
                    .then((res) => {
                        commit('setCurrentSurvey', res.data);
                        return res;
                    })
            }
            return response;
        },
        register({ commit }, user) {
            return axiosClient.post('/register', user)
                .then(({ data }) => {
                    commit('setUser', data);
                    return data;
                });
        },
        login({ commit }, user) {
            return axiosClient.post('/login', user)
                .then(({ data }) => {
                    commit('setUser', data);
                    return data;
                });
        },
        logout({ commit }) {
            return axiosClient.post('/logout')
                .then(response => {
                    commit('logout');
                    return response;
                });
        },
        deleteSurvey({ }, id) {
            return axiosClient.delete(`/survey/${id}`);
        }
    },
    mutations: {
        setCurrentSurveyLoading(state, loading) {
            state.currentSurvey.loading = loading;
        },
        setSurveysLoading(state, loading) {
            state.surveys.loading = loading;
        },
        setCurrentSurvey(state, survey) {
            state.currentSurvey.data = survey.data;
        },
        setSurveys(state, data) {
            state.surveys.data = data;
        },
        logout: state => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN');
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);
        },
        notify: (state, { message, type }) => {
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;
            setTimeout(() => {
                state.notification.show = false;
            }, 3000);
        }
    },
    modules: {},
});

export default store;