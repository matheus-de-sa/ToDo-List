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
        return {
            tasks: [],
            groupedTasks: []
        }
    },
    components: { Task, GroupedTask },
    async mounted() {
        this.tasks = await db.readTasks(
            'Users',
            this.$store.getters.getUser.uid
        )
        this.groupedTasks = await this.getGroupedTasks()
    },
    methods: {
        async getGroupedTasks() {
            let data = await db.readGroupedTasks(
                'Users',
                this.$store.getters.getUser.uid
            )

            return data
        }
    }
}
</script>

<style scoped lang="scss">
.Task {
    overflow: hidden !important;
}
</style>
