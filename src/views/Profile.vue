<template>
    <div data-aos="fade-right">
        <div class="Profile">
            <div class="CardProfile">
                <div class="CardProfileBody">
                    <div class="Form">
                        <span>Nome</span>
                        <div>{{ user.displayName }}</div>
                    </div>
                    <div class="Form mt-3">
                        <span>E-mail</span>
                        <div>{{ user.email }}</div>
                    </div>
                    <div class="mt-3 d-flex justify-content-around">
                        <div>
                            <span>Dark-Mode</span>
                            <vs-switch
                                class="switch"
                                v-model="colorMode"
                            ></vs-switch>
                        </div>
                        <div>
                            <span>Linguagem</span>
                            <vs-switch
                                class="switch"
                                v-model="colorMode"
                            ></vs-switch>
                        </div>
                    </div>
                    <div @click="logout" class="mt-4">Sair</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Auth from '../firebase/authenticate'

export default {
    name: 'Profile',
    data() {
        return {
            colorMode: false,
            language: false
        }
    },
    methods: {
        async logout() {
            let result = await Auth.logout()

            if (result) {
                this.$router.push('/authenticate')
            }
        }
    },
    computed: {
        user() {
            return this.$store.getters.getUser
        }
    },
    watch: {
        colorMode() {
            if (this.colorMode) {
                console.log('Dark')
                const html = document.querySelector('html')
                html.classList.toggle('dark-mode')
            } else {
                const html = document.querySelector('html')
                html.classList.toggle('dark-mode')
            }
        }
    }
}
</script>

<style scoped lang="scss">
.switch {
    width: 8rem;
}
.Profile {
    padding: 0rem 1rem;
}

.CardProfile {
    box-shadow: 0px 0px 10px -5px #0000004b;
    background-color: var(--color-background-white);
    color: var(--color-text);
    padding: 1rem;
    border-radius: 1rem;
    .CardProfileBody {
        display: flex;
        flex-direction: column;
        .Form {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
        }
    }
}
</style>
