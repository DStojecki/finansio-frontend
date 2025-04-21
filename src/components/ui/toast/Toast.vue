<script setup lang="ts">
import { useToast } from './use-toast'

const { toasts } = useToast()
</script>

<template>
    <div class="fixed bottom-4 right-4 z-50 space-y-2">
        <TransitionGroup name="toast">
            <div
                v-for="toast in toasts"
                :key="toast.title"
                class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 min-w-[300px]"
                :class="{
                    'border-red-500': toast.variant === 'destructive',
                    'border-gray-200 dark:border-gray-700': toast.variant !== 'destructive',
                }"
            >
                <h3 class="font-semibold">{{ toast.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ toast.description }}</p>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
