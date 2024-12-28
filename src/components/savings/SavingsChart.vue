<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useMainStore } from '@/lib/stores/main'
import { ref, watch, onMounted } from 'vue'
import { useDateFormatters } from '@/composables/useDateFormatters'

const { getPastTimeArray } = useDateFormatters()
const store = useMainStore()

watch(
    () => store.timeRange,
    () => {
        formatChartData()
    },
)

onMounted(() => {
    formatChartData()
})
const formatChartData = () => {
    data.value = getPastTimeArray(Number(store.timeRange))

    const mappedSavings = store.savings.map((saving) => {
        return {
            name: saving.name,
            history: new Array(Number(store.timeRange)),
        }
    })
    // console.log('halo', mappedSavings)

    // data.value.forEach(period => {

    // })
}
let data = ref([])
</script>

<template>
    <CardHeader>
        <CardTitle>Overview</CardTitle>
    </CardHeader>
    <CardContent class="pl-2">
        <BarChart :data="data" :categories="['total']" :index="'name'" :rounded-corners="4" />
    </CardContent>
</template>
