<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
    <nav :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
        <RouterLink
            to="/dashboard"
            class="text-sm font-medium transition-colors hover:text-primary"
        >
            Dashboard
        </RouterLink>
        <RouterLink
            to="/savings"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
            Savings
        </RouterLink>
        <RouterLink
            to="/expenses"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
            Expenses
        </RouterLink>
    </nav>
</template>
