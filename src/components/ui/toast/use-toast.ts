import { ref } from 'vue'

interface ToastOptions {
    title?: string
    description?: string
    variant?: 'default' | 'destructive'
}

const toasts = ref<ToastOptions[]>([])

export function useToast() {
    const toast = (options: ToastOptions) => {
        toasts.value.push(options)
        setTimeout(() => {
            toasts.value = toasts.value.filter((t) => t !== options)
        }, 3000)
    }

    return {
        toast,
        toasts,
    }
}
