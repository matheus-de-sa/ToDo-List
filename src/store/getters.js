import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    getUser(state) {
        return state.authUser
    },
    getRoute(state) {
        return state.route
    }
}
