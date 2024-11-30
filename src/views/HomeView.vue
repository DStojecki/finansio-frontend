<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCookies } from '@/composables/useCookies'
import { useRefreshToken } from '@/composables/useRefreshToken'
import router from '@/router'
import { reactive } from 'vue'
import { Form, Field } from 'vee-validate'

interface SignInBody {
    email: string
    password: string
}

const { setCookie } = useCookies()
const { keepTokenUpdated, dateInXseconds } = useRefreshToken()

const form: SignInBody = reactive({
    email: '',
    password: '',
})

const signIn = async () => {
    const url = 'http://localhost:3000/authentication/sign-in'

    try {
        const request = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
        const response = await request.json()
        const authExpiration = dateInXseconds(response.accessToken.ttl)

        setCookie('authExpiration', authExpiration, response.accessToken.ttl)
        setCookie('accessToken', response.accessToken.token, response.accessToken.ttl)
        setCookie('refreshToken', response.refreshToken.token, response.refreshToken.ttl)

        keepTokenUpdated()
        router.replace('dashboard')
    } catch (error) {
        console.log(error)
    }
}

const onSubmit = (values) => {
    console.log(values)
}
</script>

<template>
    <div class="w-full lg:grid min-h-[100vh] lg:grid-cols-2">
        <div class="flex items-center justify-center py-12">
            <div class="mx-auto grid w-[350px] gap-6">
                <div class="grid gap-2 text-center">
                    <h1 class="text-3xl font-bold">Login</h1>
                    <p class="text-balance text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
                <Form @submit="onSubmit" class="grid gap-4">
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Field name="email" type="email" v-model="form.email">
                            <Input id="email" type="email" required placeholder="m@example.com" />
                        </Field>
                    </div>
                    <div class="grid gap-2">
                        <div class="flex items-center">
                            <Label for="password">Password</Label>
                            <a
                                href="/forgot-password"
                                class="ml-auto inline-block text-sm underline"
                            >
                                Forgot your password?
                            </a>
                        </div>
                        <Input v-model="form.password" id="password" type="password" required />
                    </div>
                    <Button type="submit" class="w-full"> Login </Button>
                    <Button variant="outline" class="w-full"> Login with Google </Button>
                </Form>
                <div class="mt-4 text-center text-sm">
                    Don't have an account?
                    <a href="#" class="underline"> Sign up </a>
                </div>
            </div>
        </div>
        <div class="hidden bg-muted lg:block">
            <img
                src=""
                alt="Image"
                width="1920"
                height="1080"
                class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
        </div>
    </div>
</template>
