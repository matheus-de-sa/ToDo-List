<template>
    <div>
        <div class="Auth">
            <div class="Card">
                <div>
                    <img src="../assets/img/icon-512x512.png" width="50%" />
                </div>
                <div><CardLogin></CardLogin></div>
            </div>
        </div>
    </div>
</template>

<script>
import CardLogin from '../components/Auth/CardLogin.vue'

export default {
    name: 'Authenticate',
    data() {
        return {}
    },
    components: { CardLogin }
}
</script>

<style lang="scss" scoped>
.Auth {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    width: 100vw;
    height: 100vh;
}

.Card {
    box-shadow: 0px 0px 10px -5px #0000004b;
    background-color: #fff;
    padding: 1rem;
    border-radius: 1rem;
}
</style>
