import { defineStore } from 'pinia'

export interface AuthStore {
    accessToken: string
    isAuthenticated: boolean
}

export const useAuthStore = defineStore<'auth', AuthStore>({
    id: 'auth',
    state: (): AuthStore => ({
        accessToken: '',
        isAuthenticated: false,
    }),
})
