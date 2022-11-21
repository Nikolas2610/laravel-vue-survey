import { createStore } from 'vuex';
import axiosClient from '../axios';

const tmpSurveys = [
    {
        id: 100,
        title: "TheCodeholic channel",
        slug: "the-codeholic-channel",
        status: "draft",
        image: "https://i.picsum.photos/id/1058/200/300.jpg?hmac=KdLDQtUUGPBshA5WQaD3nZMUtdgHS9zJJ3pfoXWdjUE",
        description: "My name is Nikolas<br> I am web developer",
        created_at: "2022-11-10 09:00:00",
        updated_at: "2022-11-10 09:00:00",
        expire_date: "2022-11-20 09:00:00",
        questions: [
            {
                id: 1,
                type: 'select',
                question: 'From which country are you?',
                description: null,
                data: {
                    options: [
                        { uuid: "122", text: "USA" },
                        { uuid: "123", text: "US" },
                        { uuid: "124", text: "UK" },
                        { uuid: "125", text: "CY" },
                        { uuid: "126", text: "GR" },
                    ]
                }
            },
            {
                id: 2,
                type: 'checkbox',
                question: 'From which country are you?',
                description: null,
                data: {
                    options: [
                        { uuid: "122", text: "USA" },
                        { uuid: "123", text: "US" },
                        { uuid: "124", text: "UK" },
                        { uuid: "125", text: "CY" },
                        { uuid: "126", text: "GR" },
                    ]
                }
            },
            {
                id: 4,
                type: 'radio',
                question: 'From which country are you?',
                description: null,
                data: {
                    options: [
                        { uuid: "122", text: "USA" },
                        { uuid: "123", text: "US" },
                        { uuid: "124", text: "UK" },
                        { uuid: "125", text: "CY" },
                        { uuid: "126", text: "GR" },
                    ]
                }
            },
            {
                id: 5,
                type: 'text',
                question: 'From which country are you?',
                description: null,
                data: {}
            },
            {
                id: 6,
                type: 'textarea',
                question: 'From which country are you?',
                description: "Decriptions........................",
                data: {}
            },
        ]
    },
    {
        id: 100,
        title: "TheCodeholic channel2",
        slug: "the-codeholic-channel-2",
        status: "draft",
        image: "https://i.picsum.photos/id/1058/200/300.jpg?hmac=KdLDQtUUGPBshA5WQaD3nZMUtdgHS9zJJ3pfoXWdjUE",
        description: "My name is Nikolas<br> I am web developer 2",
        created_at: "2022-11-10 09:00:00",
        updated_at: "2022-11-10 09:00:00",
        expire_date: "2022-11-20 09:00:00",
        questions: [
            {
                id: 1,
                type: 'select',
                question: 'From which country are you?',
                description: null,
                data: {
                    options: [
                        { uuid: "122", text: "USA" },
                        { uuid: "123", text: "US" },
                        { uuid: "124", text: "UK" },
                        { uuid: "125", text: "CY" },
                        { uuid: "126", text: "GR" },
                    ]
                }
            },
            {
                id: 2,
                type: 'checkbox',
                question: 'From which country are you?',
                description: null,
                data: {
                    options: [
                        { uuid: "122", text: "USA" },
                        { uuid: "123", text: "US" },
                        { uuid: "124", text: "UK" },
                        { uuid: "125", text: "CY" },
                        { uuid: "126", text: "GR" },
                    ]
                }
            },
            {
                id: 4,
                type: 'radio',
                question: 'From which country are you?',
                description: null,
                data: {
                    options: [
                        { uuid: "122", text: "USA" },
                        { uuid: "123", text: "US" },
                        { uuid: "124", text: "UK" },
                        { uuid: "125", text: "CY" },
                        { uuid: "126", text: "GR" },
                    ]
                }
            },
            {
                id: 5,
                type: 'text',
                question: 'From which country are you?',
                description: null,
                data: {}
            },
            {
                id: 6,
                type: 'textarea',
                question: 'From which country are you?',
                description: "Decriptions........................",
                data: {}
            },
        ]
    },
]

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },
        surveys: [...tmpSurveys], 
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"]
    },
    getters: {},
    actions: {
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
        }
    },
    mutations: {
        logout: state => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN');
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);
        }
    },
    modules: {},
});

export default store;