<script setup lang="ts">
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import MainNav from "../components/MainNav.vue";
import Search from "../components/Search.vue";
import TeamSwitcher from "../components/TeamSwitcher.vue";
import UserNav from "../components/UserNav.vue";
import SavingsTable from "@/components/savings/SavingsTable.vue";
import SavingsChart from "@/components/savings/SavingsChart.vue";
import { onMounted, ref, watch } from "vue";
import axios from "@/lib/axios";
import { useCookies } from "@/composables/useCookies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMainStore } from "@/lib/stores/main";
import { useSavings } from "@/composables/useSavings";
import { useDialog } from "@/composables/useDialog";
import { addSavingSchema } from "@/lib/schemas/addSaving";
import DynamicForm from "@/components/DynamicForm.vue";

const store = useMainStore();
const { addNewSaving, getAllSavings } = useSavings();
const { setCookie, getCookie } = useCookies();
const [isOpen, closeDialog] = useDialog();
const usd = ref(getCookie("USD"));
const eur = ref(getCookie("EUR"));

const afterNewSavingAdded = async () => {
    store.savings = await getAllSavings();
    closeDialog();
};

onMounted(() => {
    if (usd.value && eur.value) return;
    axios.get("currency").then((response) => {
        const data = response.data;

        setCookie("USD", 1 / data.USD.value);
        setCookie("EUR", 1 / data.EUR.value);
    });
});
watch(
    () => store.currency,
    () => {
        store.countTotalAmount();
    },
);
</script>

<template>
    <div class="flex-col md:flex">
        <div class="border-b">
            <div class="flex h-16 items-center px-4">
                <TeamSwitcher />
                <MainNav class="mx-6" />
                <div class="ml-auto flex items-center space-x-4">
                    <Search />
                    <UserNav />
                </div>
            </div>
        </div>
        <div class="flex-1 space-y-4 p-8 pt-6">
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Savings</h2>
                <div class="flex items-center space-x-2">
                    <Select v-model="store.timeRange">
                        <SelectTrigger>
                            <SelectValue placeholder="Select Range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="12"
                                    >Last 12 months</SelectItem
                                >
                                <SelectItem value="6">Last 6 months</SelectItem>
                                <SelectItem value="48">Last 4 years</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select v-model="store.currency">
                        <SelectTrigger>
                            <SelectValue placeholder="Select Currency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="PLN">PLN</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="EUR">EUR</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Dialog v-model:open="isOpen">
                        <DialogTrigger>
                            <Button>Add Saving</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle class="mb-5"
                                    >Add Saving</DialogTitle
                                >
                                <DialogDescription>
                                    <DynamicForm
                                        :schema="addSavingSchema"
                                        :onSubmit="
                                            (values, actions) =>
                                                addNewSaving(
                                                    values,
                                                    actions,
                                                    afterNewSavingAdded,
                                                )
                                        "
                                        :btnText="'Save changes'"
                                    />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader
                        class="flex flex-row items-center justify-between space-y-0 pb-2"
                    >
                        <CardTitle class="text-sm font-medium">
                            Total Savings
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            class="h-4 w-4 text-muted-foreground"
                        >
                            <path
                                d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                            />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            {{ store.totalAmount }} {{ store.currency }}
                        </div>
                        <p class="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader
                        class="flex flex-row items-center justify-between space-y-0 pb-2"
                    >
                        <CardTitle class="text-sm font-medium">
                            USD PLN
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            class="h-4 w-4 text-muted-foreground"
                        >
                            <path
                                d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                            />
                            <circle cx="9" cy="7" r="4" />
                            <path
                                d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                            />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            ${{ Number(usd).toFixed(2) }}
                        </div>
                        <p class="text-xs text-muted-foreground">
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader
                        class="flex flex-row items-center justify-between space-y-0 pb-2"
                    >
                        <CardTitle class="text-sm font-medium">
                            EUR PLN
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            class="h-4 w-4 text-muted-foreground"
                        >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <path d="M2 10h20" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            €{{ Number(eur).toFixed(2) }}
                        </div>
                        <p class="text-xs text-muted-foreground">
                            +19% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <!-- <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium"> Active Now </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            class="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">+573</div>
                        <p class="text-xs text-muted-foreground">+201 since last hour</p>
                    </CardContent> -->
                </Card>
            </div>
            <div class="flex gap-2">
                <SavingsTable class="w-1/2 me-2" />
                <Card class="w-1/2">
                    <SavingsChart />
                </Card>
            </div>
        </div>
    </div>
</template>
