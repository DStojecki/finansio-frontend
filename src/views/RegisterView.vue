<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/toast/use-toast";
import { ProgressBar } from "@/components/ui/progress";
import DynamicForm from "@/components/DynamicForm.vue";
import { registerSchema } from "@/lib/schemas/register";
import axios from "@/lib/axios";
import { FormActions } from "vee-validate";

const router = useRouter();
const { toast } = useToast();

const loading = ref(false);

const passwordStrength = computed(() => {
    const password = form.value?.password || "";
    let strength = 0;

    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;

    return strength;
});

interface RegisterFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
}

const form = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
});

const onSubmit = async (
    values: RegisterFormValues,
    actions: FormActions<RegisterFormValues>,
) => {
    try {
        loading.value = true;
        const response = await axios.post("/authentication/sign-up", {
            email: values.email,
            password: values.password,
            data: {
                firstName: values.firstName,
                lastName: values.lastName,
            },
        });

        toast({
            title: "Success",
            description: "Registration successful! Please log in.",
        });
        router.push("/login");
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || "Registration failed";
        toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
        });
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="container flex items-center justify-center min-h-screen py-10">
        <Card class="w-full max-w-md">
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription
                    >Enter your details below to create your
                    account</CardDescription
                >
            </CardHeader>
            <CardContent class="space-y-4">
                <DynamicForm
                    :schema="registerSchema"
                    :onSubmit="onSubmit"
                    :btnText="
                        loading ? 'Creating account...' : 'Create account'
                    "
                    :initialValues="form"
                />
                <div class="space-y-2">
                    <ProgressBar :value="passwordStrength" class="h-1" />
                    <p class="text-xs text-muted-foreground">
                        Password strength: {{ passwordStrength }}%
                    </p>
                </div>
            </CardContent>
            <CardFooter class="flex flex-col space-y-4">
                <p class="text-sm text-center text-muted-foreground">
                    Already have an account?
                    <router-link
                        to="/login"
                        class="text-primary hover:underline"
                    >
                        Log in
                    </router-link>
                </p>
            </CardFooter>
        </Card>
    </div>
</template>
