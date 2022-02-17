<template>
    <div data-aos="fade-left" class="Task">
        <GroupedTask
            v-for="item in groupedTasks"
            :key="item.id"
            :data="item"
        ></GroupedTask>
        <Task v-for="item in tasks" :key="item.id" :data="item"></Task>
    </div>
</template>

<script>
import db from '../firebase/db'
import Task from '../components/Task/Task.vue'
import GroupedTask from '../components/GroupedTask/GroupedTask.vue'

export default {
    name: 'Home',
    data() {
        return {}
    },
    components: { Task, GroupedTask },
    computed: {
        tasks() {
            return this.$store.getters.getTasks.sort((a, b) => a.date - b.date)
        },
        groupedTasks() {
            return this.$store.getters.getGroupedTasks
        }
    }
}
</script>

<style scoped lang="scss">
.Task {
    overflow: hidden !important;
}
</style>
