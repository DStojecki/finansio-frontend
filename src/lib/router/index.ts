import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Expenses from '@/views/Expenses.vue'
import Savings from '@/views/Savings.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Login,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
        {
            path: '/savings',
            name: 'savings',
            component: Savings,
        },
        {
            path: '/expenses',
            name: 'expenses',
            component: Expenses,
        },
    ],
})

export default router
