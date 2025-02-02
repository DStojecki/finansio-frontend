<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { onMounted, ref } from 'vue'
import { columns } from '@/common/savingsColumnsDefinition'
import DataTable from '@/components/DataTable.vue'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { addSavingSchema } from '@/lib/schemas/addSaving'
import DynamicForm from '@/components/DynamicForm.vue'
import { Saving } from '@/common/types/savings'
import { useDialog } from '@/composables/useDialog'
import { useSavingsRequests } from '@/composables/useSavingsRequests'

const data = ref<Saving[]>([])
const [getAllSavings, addNewSaving] = useSavingsRequests()

const afterNewSavingAdded = async () => {
    data.value = await getAllSavings()
    closeDialog()
}

onMounted(async () => {
    data.value = await getAllSavings()
})

const [isOpen, closeDialog] = useDialog()
</script>

<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger>
            <Button>Add Saving</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle class="mb-5">Add Saving</DialogTitle>
                <DialogDescription>
                    <DynamicForm
                        :schema="addSavingSchema"
                        :onSubmit="
                            (values, actions) => addNewSaving(values, actions, afterNewSavingAdded)
                        "
                        :btnText="'Save changes'"
                    />
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
    <DataTable :columns="columns" :data="data" class="w-1/2" />
</template>
