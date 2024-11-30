<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useCookies } from '@/composables/useCookies'
import { useRefreshToken } from '@/composables/useRefreshToken'

const { getCookie } = useCookies()
const { keepTokenUpdated, dateInXseconds } = useRefreshToken()

const checkAuth = () => {
    if (!getCookie('accessToken')) return

    keepTokenUpdated()
}

checkAuth()
</script>

<template>
    <RouterView />
</template>
