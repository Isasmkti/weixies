<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { signUp } = useAuth()

const email = ref('')
const password = ref('')
const fullName = ref('')
const errorMsg = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

const handleRegister = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    await signUp(email.value, password.value, fullName.value)
    alert('Register sukses, silakan login')
    router.push('/login')
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
      <div class="absolute top-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary-dark/20 rounded-full blur-[100px]"></div>
    </div>

    <!-- Register Card -->
    <div
      class="relative z-10 w-full max-w-md bg-surface p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-bg-alt/50">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-text-main mb-2">Create Account</h1>
        <p class="text-text-muted">Join Weixies today</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-text-main mb-1.5 ml-1">Full Name</label>
            <input v-model="fullName" type="text" placeholder="John Doe"
              class="w-full px-5 py-3 rounded-xl bg-bg-alt border border-transparent focus:bg-surface focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-text-main placeholder:text-text-muted/50"
              required />
          </div>

          <div>
            <label class="block text-sm font-medium text-text-main mb-1.5 ml-1">Email</label>
            <input v-model="email" type="email" placeholder="Enter your email"
              class="w-full px-5 py-3 rounded-xl bg-bg-alt border border-transparent focus:bg-surface focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-text-main placeholder:text-text-muted/50"
              required />
          </div>

          <div>
            <label class="block text-sm font-medium text-text-main mb-1.5 ml-1">Password</label>
            <div class="relative">
              <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                class="w-full px-5 py-3 rounded-xl bg-bg-alt border border-transparent focus:bg-surface focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-text-main placeholder:text-text-muted/50 pr-12"
                required />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors">
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div v-if="errorMsg" class="p-3 rounded-lg bg-red-50 text-red-500 text-sm flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd" />
          </svg>
          {{ errorMsg }}
        </div>

        <button :disabled="isLoading"
          class="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary-dark/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2">
          <span v-if="isLoading">Creating account...</span>
          <span v-else>Sign Up</span>
          <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-text-muted text-sm">
          Already have an account?
          <router-link to="/login" class="text-primary font-semibold hover:underline">Sign in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
