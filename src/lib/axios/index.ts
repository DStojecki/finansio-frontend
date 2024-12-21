import { useCookies } from '@/composables/useCookies'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

const { getCookie } = useCookies()

axios.interceptors.request.use((config) => {
    const token = getCookie('accessToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    const userId = window.localStorage.getItem('userId')
    if (userId) {
        config.headers.user = userId
    }
    return config
})

// TODO add redirection if 401 appears
export default axios
