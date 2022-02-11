<template>
    <div data-aos="fade-left" class="Task">
        <Task v-for="(item, index) in ids" :key="index" :id="item"></Task>
    </div>
</template>

<script>
import Task from '../components/Task/Task.vue'
export default {
    data() {
        return {
            ids: [1, 2, 3, 4, 5, 6]
        }
    },
    components: { Task }
}
</script>

<style scoped lang="scss">
.Task {
    overflow: hidden !important;
}
</style>
