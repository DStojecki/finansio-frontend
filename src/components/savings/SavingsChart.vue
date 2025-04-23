<script setup lang="ts">
import { BarChart } from "@/components/ui/chart-bar";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMainStore } from "@/lib/stores/main";
import { ref, watch, onMounted } from "vue";
import { useDateFormatters } from "@/composables/useDateFormatters";
import axios from "@/lib/axios/index";

const { getPastTimeArray } = useDateFormatters();
const store = useMainStore();
const data = ref([]);
const categories = ref(store.savings.map((saving) => saving.name));
const chartKey = ref(0);

watch(
    () => store.timeRange,
    (newPeriod: string) => {
        getChartData(newPeriod);
    },
);

watch(data, () => {
    chartKey.value += 1;
});

onMounted(() => {
    getChartData(store.timeRange);
});

const getChartData = (period: string) => {
    const monthNames = getPastTimeArray(parseInt(period));
    axios.get(`savings-operation/period/${period}`).then((res) => {
        data.value = res.data.map((saving, index) => {
            console.log(saving);
            let object = {
                name: monthNames[index].name,
            };

            saving.forEach((element) => {
                object = {
                    [element.saving.name]: element.amount,
                    ...object,
                };
            });

            return object;
        });
    });
};
</script>

<template>
    <CardHeader>
        <CardTitle>Overview</CardTitle>
    </CardHeader>
    <CardContent class="pl-2">
        <BarChart
            :key="chartKey"
            index="name"
            :data="data"
            :colors="['red', 'blue', 'green']"
            :categories="categories"
            :y-formatter="
                (tick, i) => {
                    return typeof tick === 'number'
                        ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                        : '';
                }
            "
            :type="'stacked'"
        />
    </CardContent>
</template>
