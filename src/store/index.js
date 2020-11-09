/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import PS from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lessons: [],
        cart: []  
    },
    mutations: {
        addLesson(state, lesson) {
            state.lessons.push(lesson)
        },
        addToCart(state, item) {
            state.cart.push(item)
        },
        clearLessons(state) {
            state.lessons = []
            state.cart = []
        }
    },
    getters: {
        lessons: state => state.lessons,
        cart: state=>state.cart
    },
    actions: {},
    modules: {},
    plugins: [PS()]
});
