<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

defineProps({
    schema: {
        type: Object,
        required: true,
    },
    onSubmit: Function,
    btnText: String,
    initialValues: {
        type: Object,
        default: () => ({}),
    },
})
</script>

<template>
    <Form :initial-values="initialValues" @submit="onSubmit" class="grid gap-4">
        <div
            v-for="{ as, name, label, children, ...attrs } in schema.fields"
            :key="name"
            class="grid gap-2 pb-4 relative"
        >
            <Label :for="name">{{ label }}</Label>
            <Field
                :as="as"
                :id="name"
                :name="name"
                v-bind="attrs"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <template v-if="children && children.length">
                    <component
                        v-for="({ tag, text, ...childAttrs }, idx) in children"
                        :key="idx"
                        :is="tag"
                        v-bind="childAttrs"
                    >
                        {{ text }}
                    </component>
                </template>
            </Field>
            <ErrorMessage
                :name="name"
                class="absolute bottom-0 text-xs capitalize text-red-500 font-bold"
            />
        </div>
        <Button class="w-full">{{ btnText }}</Button>
    </Form>
</template>
