<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-vue-next'
import axios from '@/lib/axios/index'

defineProps<{
    saving: {
        id: string
    }
}>()

const deleteSaving = async (id) => {
    axios
        .delete(`savings/${id}`)
        .then((response) => {
            
        })
}
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="w-8 h-8 p-0">
                <span class="sr-only">Open menu</span>
                <MoreHorizontal class="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="deleteSaving(saving.id)">Delete</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
