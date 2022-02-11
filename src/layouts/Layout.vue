<template>
    <div>
        <NavBar></NavBar>
        <div class="Layout">
            <router-view></router-view>
        </div>
        <BottomBar></BottomBar>
    </div>
</template>

<script>
import BottomBar from '../components/Layout/BottomBar.vue'
import NavBar from '../components/Layout/NavBar.vue'

export default {
    components: { BottomBar, NavBar },
    data() {
        return {
            route: ''
        }
    }
}
</script>

<style scoped lang="scss">
.Layout {
    overflow: auto;
    width: 100vw;
    margin-top: 3rem;
    margin-bottom: 3rem;
    padding: 1rem 0rem;
    height: calc(100vh - 6rem);
}
</style>
