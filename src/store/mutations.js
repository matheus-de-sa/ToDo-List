import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    authUser(state, user) {
        state.authUser = user
    },
    addRoute(state, route) {
        state.route = route
    },
    addGroups(state, groups) {
        state.groups = groups
    },
    addTasks(state, tasks) {
        state.tasks = tasks
    },
    addGroupedTasks(state, tasks) {
        state.groupedTasks = tasks
    },
    addAllTasks(state, tasks) {
        state.allTasks = tasks
    }
}
