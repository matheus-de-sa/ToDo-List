<template>
    <div>
        <div class="CardInput">
            <div class="Input">
                <label
                    class="LabelInput"
                    :class="labelEmail ? 'LabelSelect' : ''"
                    for="Email"
                    >E-mail</label
                >
                <vs-input
                    primary
                    v-model="email"
                    placeholder="Digite seu email"
                >
                    <template #icon>
                        <i class="bx bx-mail-send"></i>
                    </template>
                </vs-input>
            </div>
            <div class="Input">
                <label
                    class="LabelInput"
                    :class="labelPassword ? 'LabelSelect' : ''"
                    for="Password"
                    >Senha</label
                >
                <vs-input
                    primary
                    type="password"
                    v-model="password"
                    placeholder="Digite sua senha"
                >
                    <template #icon>
                        <i class="bx bx-key"></i>
                    </template>
                </vs-input>
            </div>
            <div class="mt-4">
                <vs-button @click="signLogin" class="ButtonLogin" flat>
                    Login
                </vs-button>
            </div>
            <div class="mt-4 Icons">
                <vs-button
                    @click="signGoogleAuth"
                    class="mx-2"
                    icon
                    color="reddit"
                >
                    <i class="bx bxl-google"></i>
                </vs-button>
                <vs-button disabled class="mx-2" icon color="facebook">
                    <i class="bx bxl-facebook-square"></i>
                </vs-button>
            </div>
            <div @click="$router.push('/register')" class="mt-3 Register">
                Cadastre-se
            </div>
        </div>
    </div>
</template>

<script>
import Authenticate from '../../firebase/authenticate'

export default {
    name: 'CardLogin',
    data() {
        return {
            email: '',
            password: '',
            labelPassword: false,
            labelEmail: false
        }
    },
    watch: {
        password(value) {
            if (value.length === 0) this.labelPassword = false
            else this.labelPassword = true
        },
        email(value) {
            if (value.length === 0) this.labelEmail = false
            else this.labelEmail = true
        }
    },
    methods: {
        async signGoogleAuth() {
            try {
                const result = await Authenticate.signPopup()

                if (result) {
                    this.$router.push('/')
                }
            } catch (error) {
                console.log(error)
            }
        },
        async signLogin() {
            try {
                if (this.email.length === 0 && this.password.length === 0) {
                } else {
                    const user = await Authenticate.signEmail(email, password)

                    if (user) {
                        this.$router.push('/')
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style>
.vs-input__label {
    width: 80%;
}

.vs-input--has-icon ~ .vs-input__label {
    left: 44px;
}
.vs-input {
    width: 100%;
}
.vs-button {
    margin: 0%;
}
</style>

<style lang="scss" scoped>
.Register {
    color: rgb(95, 95, 95);
    font-size: 0.9rem;
    &:active {
        color: #008c9e;
    }
}

.LabelSelect {
    color: #008c9e;
}

.ButtonLogin {
    width: 100%;
}

.LabelInput {
    margin: 0.5rem 0.5rem;
    width: 100%;
    text-align: start;
    font-size: 0.9rem;
}

.CardInput {
    margin-top: 1rem;
}

.Icons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
