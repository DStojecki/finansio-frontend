<script setup lang="ts">
import { BarChart } from "@/components/ui/chart-bar";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMainStore } from "@/lib/stores/main";
import { ref, watch, onMounted } from "vue";
import { useDateFormatters } from "@/composables/useDateFormatters";
import axios from "@/lib/axios/index";

const { getPastTimeArray } = useDateFormatters();
const store = useMainStore();

watch(
    () => store.timeRange,
    (newPeriod: string) => {
        getChartData(newPeriod);
    },
);

onMounted(() => {
    getChartData(store.timeRange);
});
const getChartData = (period: string) => {
    axios.get(`savings-operation/period/${period}`);
};
// let data = ref([])
const data = [
    {
        name: "Jan",
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
    },
    {
        name: "Feb",
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
    },
    {
        name: "Mar",
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
    },
    {
        name: "Apr",
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
    },
    {
        name: "May",
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
    },
    {
        name: "Jun",
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
    },
    {
        name: "Jul",
        total: Math.floor(Math.random() * 2000) + 500,
        predicted: Math.floor(Math.random() * 2000) + 500,
    },
];
</script>

<template>
    <CardHeader>
        <CardTitle>Overview</CardTitle>
    </CardHeader>
    <CardContent class="pl-2">
        <BarChart
            :data="data"
            :categories="['total']"
            :index="'name'"
            :rounded-corners="4"
        />
    </CardContent>
</template>
