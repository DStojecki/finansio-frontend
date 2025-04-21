<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useCookies } from '@/composables/useCookies'
import { useRefreshToken } from '@/composables/useRefreshToken'
import Toast from '@/components/ui/toast/Toast.vue'

const { getCookie } = useCookies()
const { keepTokenUpdated } = useRefreshToken()

const checkAuth = () => {
    if (!getCookie('accessToken')) return

    keepTokenUpdated()
}

console.log('App Start')
checkAuth()
</script>

<template>
    <RouterView />
    <Toast />
</template>
