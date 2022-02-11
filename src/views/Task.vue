<template>
    <div :data-aos="transition">
        <div>
            Criar Tarefa
            <div></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Task',
    data() {
        return {}
    },
    computed: {
        transition() {
            let route = this.$store.getters.getRoute
            let transition = 'fade-top'

            if (route === 'Calendar') transition = 'fade-left'
            if (route === 'Home') transition = 'fade-right'

            return transition
        }
    }
}
</script>

<style lang="scss" scoped></style>
