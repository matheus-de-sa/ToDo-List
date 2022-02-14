import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import FirebaseApp from '../firebase/index'
import { getAuth } from 'firebase/auth'

const Auth = getAuth(FirebaseApp)

Vue.use(VueRouter)

const routes = [
    {
        path: '/authenticate',
        name: 'Authenticate',
        meta: {
            title: 'Authenticate',
            Auth: false
        },
        component: () =>
            import(
                /* webpackChunkName: "Authenticate" */ '../views/Authenticate.vue'
            )
    },
    {
        path: '/register',
        name: 'Register',
        meta: {
            title: 'Register',
            Auth: false
        },
        component: () =>
            import(
                /* webpackChunkName: "Authenticate" */ '../views/Register.vue'
            )
    },
    {
        path: '/',
        name: 'Layout',
        meta: {
            title: 'Layout',
            Auth: true
        },
        component: () =>
            import(/* webpackChunkName: "Layout" */ '../layouts/Layout.vue'),
        beforeEnter(to, from, next) {
            store.dispatch('authUser', Auth.currentUser)
            next()
        },
        children: [
            {
                path: '',
                meta: {
                    title: 'Home',
                    Auth: true
                },
                component: () =>
                    import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
                beforeEnter(to, from, next) {
                    console.log(from)
                    store.dispatch('addRoute', from.meta.title)
                    next()
                }
            },
            {
                path: '/group/:name',
                meta: {
                    title: 'Grupo',
                    Auth: true
                },
                component: () =>
                    import(
                        /* webpackChunkName: "Home" */ '../views/GroupTask.vue'
                    ),
                beforeEnter(to, from, next) {
                    console.log(from)
                    store.dispatch('addRoute', from.meta.title)
                    next()
                }
            },
            {
                path: 'task',
                meta: {
                    title: 'Task',
                    Auth: true
                },
                component: () =>
                    import(/* webpackChunkName: "Home" */ '../views/Task.vue'),
                beforeEnter(to, from, next) {
                    store.dispatch('addRoute', from.meta.title)
                    next()
                }
            },
            {
                path: 'calendar',
                meta: {
                    title: 'Calendar',
                    Auth: true
                },
                component: () =>
                    import(
                        /* webpackChunkName: "Home" */ '../views/Calendar.vue'
                    ),
                beforeEnter(to, from, next) {
                    store.dispatch('addRoute', from.meta.title)
                    next()
                }
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = `To-Do List | ${to.meta.title}`
    const requiredAuth = to.matched.some((x) => x.meta.Auth)

    if (requiredAuth && !Auth.currentUser) {
        next('/authenticate')
    } else {
        next()
    }

    if (Auth.currentUser !== null && to.path === '/authenticate') {
        next('/')
    }
    if (Auth.currentUser !== null && to.path === '/register') {
        next('/')
    }
})

export default router
