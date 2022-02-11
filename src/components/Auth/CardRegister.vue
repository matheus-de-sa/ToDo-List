<template>
    <div>
        <div class="CardInput">
            <div class="Input">
                <label
                    class="LabelInput"
                    :class="labelName ? 'LabelSelect' : ''"
                    for="Email"
                    >Nome Completo</label
                >
                <vs-input primary v-model="name" placeholder="Digite seu nome">
                    <template #icon>
                        <i class="bx bx-user"></i>
                    </template>
                </vs-input>
            </div>
            <div class="Input">
                <label
                    class="LabelInput"
                    :class="labelEmail ? 'LabelSelect' : ''"
                    for="Email"
                    >E-mail</label
                >
                <vs-input
                    type="email"
                    primary
                    v-model="email"
                    placeholder="Digite seu email"
                >
                    <template #icon>
                        <i class="bx bx-mail-send"></i>
                    </template>
                    <template #message-warn v-if="testEmail">
                        Digite um e-mail válido</template
                    >
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
            <div class="Input">
                <label
                    class="LabelInput"
                    :class="labelPasswordCopy ? 'LabelSelect' : ''"
                    for="Password"
                    >Repetir a Senha</label
                >
                <vs-input
                    primary
                    type="password"
                    v-model="passwordCopy"
                    placeholder="Digite sua senha novamente"
                >
                    <template #icon>
                        <i class="bx bx-key"></i>
                    </template>
                </vs-input>
            </div>
            <div
                class="List"
                v-if="password.length > 0 && password !== passwordCopy"
            >
                <div>A Senha deve conter:</div>
                <li :class="testPassword.eightCaracters ? 'LabelSelect' : ''">
                    8 Caracteres
                </li>
                <li :class="testPassword.number ? 'LabelSelect' : ''">
                    Números
                </li>
                <li
                    :class="
                        testPassword.upperCaseCaracters ? 'LabelSelect' : ''
                    "
                >
                    Letra Maiúscula
                </li>
                <li :class="password === passwordCopy ? 'LabelSelect' : ''">
                    As Senha Combinam
                </li>
            </div>
            <div class="mt-4">
                <vs-button
                    @click="createUser"
                    :loading="loading"
                    :disabled="!enabledToRegister"
                    class="ButtonLogin"
                    flat
                >
                    Cadastrar
                </vs-button>
            </div>
            <div @click="$router.push('/authenticate')" class="mt-3 Register">
                Já tem Cadastro? Clique aqui!
            </div>
        </div>
    </div>
</template>

<script>
import Authenticate from '../../firebase/authenticate'

export default {
    name: 'CardRegister',
    data() {
        return {
            email: '',
            password: '',
            passwordCopy: '',
            name: '',
            labelPassword: false,
            labelPasswordCopy: false,
            labelEmail: false,
            labelName: false,
            enabledToRegister: false,
            testEmail: false,
            testPassword: {
                eightCaracters: false,
                number: false,
                upperCaseCaracters: false
            },
            loading: false
        }
    },
    watch: {
        passwordCopy() {
            if (this.passwordCopy.length === 0) this.labelPasswordCopy = false
            else this.labelPasswordCopy = true

            let test = 0

            if (this.password === this.passwordCopy) test += 1
            if (this.testPassword.eightCaracters) test += 1
            if (this.testPassword.number) test += 1
            if (this.testPassword.upperCaseCaracters) test += 1

            if (test === 4) this.enabledToRegister = true
            else this.enabledToRegister = false
        },
        password() {
            if (this.password.length === 0) this.labelPassword = false
            else this.labelPassword = true

            if (this.password.length > 7)
                this.testPassword.eightCaracters = true
            else this.testPassword.eightCaracters = false

            this.testPassword.number = /\d/.test(this.password)
            this.testPassword.upperCaseCaracters = /[A-Z]/.test(this.password)

            let test = 0

            if (this.password === this.passwordCopy) test += 1
            if (this.testPassword.eightCaracters) test += 1
            if (this.testPassword.number) test += 1
            if (this.testPassword.upperCaseCaracters) test += 1

            if (test === 4) this.enabledToRegister = true
            else this.enabledToRegister = false
        },
        email(value) {
            if (value.length === 0) {
                this.labelEmail = false
                this.testEmail = false
            } else {
                console.log(value)
                if (!value.includes('@')) {
                    this.testEmail = true
                } else {
                    this.testEmail = false
                }
                this.labelEmail = true
            }
        },
        name(value) {
            if (value.length === 0) this.labelName = false
            else this.labelName = true
        }
    },
    methods: {
        async createUser() {
            try {
                this.loading = true

                if (
                    this.enabledToRegister &&
                    this.name.lenght > 0 &&
                    this.email.length > 0
                ) {
                    const userCreated = await Authenticate.createUser(
                        this.email,
                        this.password,
                        this.name
                    )
                    if (userCreated) {
                        this.loading = false
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
.List {
    margin-top: 1.5rem;
    padding: 0rem 1rem;
    li {
        text-align: start;
    }
    div {
        text-align: start;
    }
}

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
