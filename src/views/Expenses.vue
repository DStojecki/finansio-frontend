<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs/";
import DateRangePicker from "../components/DateRangePicker.vue";
import MainNav from "../components/MainNav.vue";
import Overview from "../components/Overview.vue";
import RecentSales from "../components/RecentSales.vue";

import Search from "../components/Search.vue";
import TeamSwitcher from "../components/TeamSwitcher.vue";
import UserNav from "../components/UserNav.vue";

import axios from "@/lib/axios/index";

axios.get("/coffees");
</script>

<template>
    <div class="md:hidden">
        <VPImage
            alt="Dashboard"
            width="1280"
            height="1214"
            class="block"
            :image="{
                dark: '/examples/dashboard-dark.png',
                light: '/examples/dashboard-light.png',
            }"
        />
    </div>

    <div class="hidden flex-col md:flex">
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
                <h2 class="text-3xl font-bold tracking-tight">Expenses</h2>
                <div class="flex items-center space-x-2">
                    <DateRangePicker />
                    <Button>Download</Button>
                </div>
            </div>
        </div>
    </div>
</template>
