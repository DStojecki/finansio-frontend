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
const firstLoad = ref(false);

// Watch for changes in savings data
watch(
    () => store.savings,
    (newSavings) => {
        categories.value = newSavings.map((saving) => saving.name);
        getChartData(store.timeRange);
    },
    { deep: true },
);

// Watch for time range changes
watch(
    () => store.timeRange,
    (newPeriod: string) => {
        getChartData(newPeriod);
    },
);

// Watch for data changes to ensure chart updates
watch(
    () => data.value,
    () => {
        firstLoad.value = true;
    },
    { deep: true },
);

onMounted(() => {
    getChartData(store.timeRange);
});

const getChartData = (period: string) => {
    const monthNames = getPastTimeArray(parseInt(period));
    axios.get(`savings-operation/period/${period}`).then((res) => {
        data.value = res.data.map((saving, index) => {
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
        <CardTitle>Timeline</CardTitle>
    </CardHeader>
    <CardContent v-if="firstLoad" class="pl-2">
        <BarChart
            index="name"
            :data="data"
            :colors="['red', 'blue', 'green']"
            :categories="categories"
            :roundedCorners="5"
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
