<template>
    <div>
        <div class="Auth">
            <div class="Card">
                <div>
                    <img src="../assets/img/icon-512x512.png" width="50%" />
                </div>
                <div><CardRegister></CardRegister></div>
            </div>
        </div>
    </div>
</template>

<script>
import CardRegister from '../components/Auth/CardRegister.vue'

export default {
    name: 'Register',
    data() {
        return {}
    },
    components: { CardRegister }
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
