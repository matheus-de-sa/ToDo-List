<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
@import url('./assets/scss/style.scss');

#app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center !important;
    background-color: var(--color-background-body) !important;
    color: #2c3e50;
}
</style>

<script>
export default {
    methods: {
        notifyMe() {
            if (!('Notification' in window)) {
                alert('This browser does not support desktop notification')
            } else if (Notification.permission === 'granted') {
                var notification = new Notification('Hi there!')
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(function (permission) {
                    if (permission === 'granted') {
                        var notification = new Notification('Hi there!')
                    }
                })
            }
        }
    }
}
</script>
