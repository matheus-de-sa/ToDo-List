import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    authUser({ commit }, user) {
        commit('authUser', user)
    },
    addRoute({ commit }, route) {
        commit('addRoute', route)
    },
    addGroups({ commit }, groups) {
        commit('addGroups', groups)
    },
    addTasks({ commit }, tasks) {
        commit('addTasks', tasks)
    },
    addGroupedTasks({ commit }, tasks) {
        commit('addGroupedTasks', tasks)
    },
    addAllTasks({ commit }, tasks) {
        commit('addAllTasks', tasks)
    }
}
