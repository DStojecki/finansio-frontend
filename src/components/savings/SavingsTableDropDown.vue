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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { MoreHorizontal } from 'lucide-vue-next'
import axios from '@/lib/axios/index'
import { useMainStore } from '@/lib/stores/main'
import { useDialog } from '@/composables/useDialog'
import { useSavings } from '@/composables/useSavings'
import { Saving } from '@/common/types/savings'
import { editSavingSchema } from '@/lib/schemas/editSaving'
import { addSavingHistory } from '@/lib/schemas/addSavingHistory'
import DynamicForm from '../DynamicForm.vue'
import { ref } from 'vue'

const props = defineProps<{
    saving: Saving
}>()
const store = useMainStore()
const { getAllSavings } = useSavings()
let [isOpen, closeDialog] = useDialog()
const modalType = ref('edit')

const deleteSaving = async (id) => {
    await axios.delete(`savings/${id}`).then((response) => {
        console.log(response)
    })

    store.savings = store.savings.filter((el) => el.id !== id)
}

const editSaving = async (values, actions) => {
    await axios
        .patch(`savings/${props.saving.id}`, values)
        .then(async (response) => {
            console.log(response.data)
            store.savings = response.data
        })
        .finally(() => {
            closeDialog()
        })
}

const addSavingHistoryRq = async (values, actions) => {
    await axios
        .post(`savings/${props.saving.id}/history`, values)
        .then(async (response) => {
            console.log(response.data)
            store.savings = response.data
        })
        .finally(() => {
            closeDialog()
        })
}

const initialValues = {
    name: props.saving.name,
    currency: props.saving.currency,
}

const openModal = (type: string) => {
    modalType.value = type
    isOpen.value = true
    console.log(modalType.value)
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
            <DropdownMenuItem @click="openModal('edit')">Edit</DropdownMenuItem>
            <DropdownMenuItem @click="openModal('history')">Add History</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    <Dialog v-model:open="isOpen">
        <DialogContent>
            <DialogHeader>
                <template v-if="modalType === 'edit'">
                    <DialogTitle class="mb-5">Edit Saving</DialogTitle>
                    <DialogDescription>
                        <p class="font-medium mb-4">
                            Current Saving Value
                            <span class="text-3xl font-bold text-green-600 block my-2">
                                {{ saving.history[saving.history.length - 1].amount }}
                                {{ saving.currency }}</span
                            >
                        </p>
                        <DynamicForm
                            :schema="editSavingSchema"
                            :initialValues="initialValues"
                            :onSubmit="(values, actions) => editSaving(values, actions)"
                            :btnText="'Save changes'"
                        />
                    </DialogDescription>
                </template>
                <template v-if="modalType === 'history'">
                    <DialogTitle class="mb-5">Add History Record</DialogTitle>
                    <DialogDescription>
                        <p class="font-medium mb-4">
                            If you want to add history state of that saving here is the place to do
                            it.
                        </p>
                        <DynamicForm
                            :schema="addSavingHistory"
                            :initialValues="initialValues"
                            :onSubmit="(values, actions) => addSavingHistoryRq(values, actions)"
                            :btnText="'Save changes'"
                        />
                    </DialogDescription>
                </template>
            </DialogHeader>
        </DialogContent>
    </Dialog>
</template>
