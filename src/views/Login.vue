<script setup lang="ts">
import axios from "@/lib/axios";
import router from "@/lib/router";
import DynamicForm from "@/components/DynamicForm.vue";
import { useCookies } from "@/composables/useCookies";
import { useRefreshToken } from "@/composables/useRefreshToken";
import { signUpFormSchema } from "@/lib/schemas/signUp";
import { useAuthStore } from "@/lib/stores/auth";

interface SignInBody {
    email: string;
    password: string;
}

const store = useAuthStore();
const { setCookie } = useCookies();
const { keepTokenUpdated, dateInXseconds } = useRefreshToken();

const signIn = async (values: SignInBody, actions) => {
    axios
        .post("/authentication/sign-in", values)
        .then(function (response) {
            const authExpiration = dateInXseconds(
                response.data.accessToken.ttl,
            );
            store.$state.user = response.data.user;

            setCookie(
                "authExpiration",
                authExpiration,
                response.data.accessToken.ttl,
            );
            setCookie(
                "accessToken",
                response.data.accessToken.token,
                response.data.accessToken.ttl,
            );
            setCookie(
                "refreshToken",
                response.data.refreshToken.token,
                response.data.refreshToken.ttl,
            );
            window.localStorage.setItem("userId", store.user.id);

            keepTokenUpdated();
            router.push("savings");
        })
        .catch(function (error) {
            const errorMessage = error.response.data;

            actions.setFieldError(errorMessage.field, errorMessage.message);
        });
};
</script>

<template>
    <div class="w-full lg:grid min-h-[100vh] max-h-[100vh] lg:grid-cols-2">
        <div class="flex items-center justify-center">
            <div class="mx-auto grid w-[350px] gap-6">
                <div class="grid gap-2 text-center">
                    <h1 class="text-3xl font-bold">Login</h1>
                    <p class="text-balance text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
                <DynamicForm
                    :schema="signUpFormSchema"
                    :onSubmit="signIn"
                    :btnText="'Login'"
                />
                <div class="mt-4 text-center text-sm">
                    Don't have an account?
                    <a href="/register" class="underline"> Sign up </a>
                </div>
            </div>
        </div>
        <div class="hidden bg-muted lg:block max-h-[100vh]">
            <img
                src="@/assets/login.jpg"
                alt="Image"
                class="h-full w-full object-cover object-center dark:brightness-[0.2] dark:grayscale"
            />
        </div>
    </div>
</template>
