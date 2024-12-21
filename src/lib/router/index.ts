import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Dashboard from '@/views/Dashboard.vue'
import Expenses from '@/views/Expenses.vue'
import Savings from '@/views/Savings.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
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
