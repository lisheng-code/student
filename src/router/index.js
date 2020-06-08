import Vue from 'vue'
import VueRouter from 'vue-router'
import all from '../components/all.vue'
import active from '../components/active.vue'
import completed from '../components/completed.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', redirect: 'all' },
        { path: '/all', component: all },
        { path: '/active', component: active },
        { path: '/completed', component: completed }
    ]
})
export default router