import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Layout',
        meta: {
            title: 'Layout'
        },
        component: () =>
            import(/* webpackChunkName: "about" */ '../layouts/Layout.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                meta: {
                    title: 'Home'
                },
                component: () =>
                    import(/* webpackChunkName: "about" */ '../views/Home.vue')
            },
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

    next()
})

export default router
