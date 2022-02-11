import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    authUser({ commit }, user) {
        commit('authUser', user)
    },
    addRoute({ commit }, route) {
        commit('addRoute', route)
    }
}
