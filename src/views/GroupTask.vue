<template>
    <div class="Task">
        <Task v-for="item in tasks" :key="item.id" :data="item"></Task>
    </div>
</template>

<script>
import db from '../firebase/db'
import Task from '../components/Task/Task.vue'

export default {
    name: 'Home',
    data() {
        return {
            tasks: []
        }
    },
    components: { Task },
    async mounted() {
        this.tasks = await db.readTasksGroup(
            'Users',
            this.$store.getters.getUser.uid,
            this.$route.params.name
        )
    }
}
</script>

<style scoped lang="scss">
.Task {
    overflow: hidden !important;
}
</style>
