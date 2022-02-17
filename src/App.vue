<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
@import url('./assets/scss/style.scss');

body {
    background-color: var(--color-background-body) !important;
}

#app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
