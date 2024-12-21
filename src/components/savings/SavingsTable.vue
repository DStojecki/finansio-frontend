<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { columns } from '@/common/savingsColumnsDefinition'
import DataTable from '@/components/DataTable.vue'
import { useSavings } from '@/composables/useSavings'
import { useMainStore } from '@/lib/stores/main'

const store = useMainStore()
const { getAllSavings } = useSavings()

onMounted(async () => {
    store.savings = await getAllSavings()
})

watch(
    () => store.savings,
    () => {
        store.countTotalAmount()
    },
)
</script>

<template>
    <DataTable :columns="columns" :data="store.savings" />
</template>
