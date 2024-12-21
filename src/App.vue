<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useCookies } from '@/composables/useCookies'
import { useRefreshToken } from '@/composables/useRefreshToken'

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
</template>
