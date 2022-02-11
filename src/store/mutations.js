import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    authUser(state, user) {
        state.authUser = user
    },
    addRoute(state, route) {
        state.route = route
    }
}
