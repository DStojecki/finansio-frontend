import { defineStore } from 'pinia'

export interface AuthStore {
    accessToken: string
    isAuthenticated: boolean
    user: {
        email: string
        id: string
    }
}

export const useAuthStore = defineStore<'auth', AuthStore>({
    id: 'auth',
    state: (): AuthStore => ({
        accessToken: '',
        isAuthenticated: false,
        user: {
            email: '',
            id: '',
        },
    }),
})
