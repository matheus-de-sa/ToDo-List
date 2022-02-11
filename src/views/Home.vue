<template>
    <div>
        <Task></Task>
        <Task></Task>
        <Task></Task>
        <Task></Task>
        <Task></Task>
        <Task></Task>
    </div>
</template>

<script>
import Task from '../components/Task/Task.vue'
export default {
    data() {
        return {
            route: ''
        }
    },
    components: { Task }
}
</script>

<style scoped lang="scss">

</style>
