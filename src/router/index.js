import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Home.vue'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: "/home",
        },
        {
            path: '/home',
            component: Home
        }
    ]
})

export default router