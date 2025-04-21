import router from './index'
import { useCookies } from '@/composables/useCookies'

const { getCookie } = useCookies()

export const authGuard = () => {
    router.beforeEach(async (to, from) => {
        if (!getCookie('accessToken') && to.name !== 'home' && to.name !== 'register') {
            return { name: 'home' }
        }
    })
}
