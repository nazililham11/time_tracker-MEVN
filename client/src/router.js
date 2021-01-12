import Vue from 'vue'
import VueRouter from 'vue-router'
import Project from './views/Project.vue'
import Category from './views/Category.vue'
import TimeRecord from './views/TimeRecord.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/record'
    },
    {
        path: '/project',
        name: 'Project',
        component: Project
    },
    {
        path: '/category',
        name: 'Category',
        component: Category
    },
    {
        path: '/record',
        name: 'TimeRecord',
        component: TimeRecord
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
