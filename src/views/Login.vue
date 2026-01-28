<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { signIn } = useAuth()

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
    isLoading.value = true
    errorMsg.value = ''
    try {
        await signIn(email.value, password.value)
        router.push('/dashboard')
    } catch (err) {
        errorMsg.value = err.message
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden font-poppins">
        <!-- Decorative background elements -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div class="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
            <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-dark/20 rounded-full blur-[100px]"></div>
        </div>

        <!-- Login Card -->
        <div
            class="relative z-10 w-full max-w-md bg-surface p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-bg-alt/50">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-text-main mb-2">Welcome Back</h1>
                <p class="text-text-muted">Login to access your dashboard</p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-6">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-text-main mb-1.5 ml-1">Email</label>
                        <input v-model="email" type="email" placeholder="Enter your email"
                            class="w-full px-5 py-3 rounded-xl bg-bg-alt border border-transparent focus:bg-surface focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-text-main placeholder:text-text-muted/50"
                            required />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-text-main mb-1.5 ml-1">Password</label>
                        <input v-model="password" type="password" placeholder="••••••••"
                            class="w-full px-5 py-3 rounded-xl bg-bg-alt border border-transparent focus:bg-surface focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-text-main placeholder:text-text-muted/50"
                            required />
                    </div>
                </div>

                <div v-if="errorMsg" class="p-3 rounded-lg bg-red-50 text-red-500 text-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd" />
                    </svg>
                    {{ errorMsg }}
                </div>

                <button :disabled="isLoading"
                    class="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary-dark/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2">
                    <span v-if="isLoading">Logging in...</span>
                    <span v-else>Login</span>
                    <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </form>

            <div class="mt-8 text-center">
                <p class="text-text-muted text-sm">
                    Don't have an account?
                    <router-link to="/signup" class="text-primary font-semibold hover:underline">Sign up</router-link>
                </p>
            </div>
        </div>
    </div>
</template>
