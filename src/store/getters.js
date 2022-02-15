import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    getUser(state) {
        return state.authUser
    },
    getRoute(state) {
        return state.route
    },
    getGroups(state) {
        return state.groups
    },
    getTasks(state) {
        return state.tasks
    },
    getGroupedTasks(state) {
        return state.groupedTasks
    },
    getAllTasks(state) {
        return state.allTasks
    }
}
