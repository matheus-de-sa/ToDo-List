import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import VueI18n from 'vue-i18n'
import VueMq from 'vue-mq'
import FirebaseApp from './firebase/index'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import './registerServiceWorker'
import 'vuesax/dist/vuesax.css'
import 'hooper/dist/hooper.css'
import './assets/scss/style.scss'

const Auth = getAuth(FirebaseApp)

Vue.use(VueI18n)
Vue.use(Vuesax, {
    colors: {
        primary: '#008C9E',
        success: 'rgb(23, 201, 100)',
        danger: 'rgb(242, 19, 93)',
        warning: 'rgb(255, 130, 0)',
        dark: '#343838'
    }
})
Vue.use(VueMq, {
    breakpoints: {
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1500,
        xxl: Infinity
    }
})

const idioma = () => {
    if (!localStorage.getItem('lang')) {
        localStorage.setItem('lang', 'pt_BR')
    }

    return localStorage.getItem('lang')
}

const i18nConfig = (VueI18n, lang) => {
    return new VueI18n({
        locale: 'pt_BR',
        messages: require('./i18n/index.js')
    })
}

const i18n = i18nConfig(VueI18n, idioma())

Vue.config.productionTip = false

onAuthStateChanged(Auth, () => {
    new Vue({
        i18n,
        router,
        store,
        render: (h) => h(App)
    }).$mount('#app')
})
