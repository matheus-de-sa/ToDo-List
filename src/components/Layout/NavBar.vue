<template>
    <div class="header">
        <img src="../../assets/img/icon-512x512.png" />
        <div>
            <div class="User" @click="$router.push('/profile')">
                <img
                    v-if="User.photoURL"
                    :src="User.photoURL"
                    alt="Foto de Perfil do Usuário"
                />
                <div v-else>
                    {{ Name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    computed: {
        User() {
            return this.$store.getters.getUser
        },
        Name() {
            let { displayName } = this.User
            displayName = displayName.replace(' de ', ' ')
            let name = displayName.split(' ')
            return `${name[0][0]}${name[1][0]}`
        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 1rem;
    padding-left: 1rem;
    top: 0;
    width: 100vw;
    height: 3rem;
    background: var(--color-background-white);
    box-shadow: 0px 7px 15px -7px #0000004b;
    img {
        width: 4rem;
    }
}

.User {
    border: 2px solid var(--color-blue);
    padding: 1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
        width: 2rem;
        height: 2rem;
        border-radius: 1rem;
        object-fit: cover;
    }
}
</style>
