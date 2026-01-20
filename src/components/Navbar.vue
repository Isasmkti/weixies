<template>
  <nav :class="[
    'fixed top-0 left-0 w-full z-50 flex justify-between items-center transition-all duration-300',
    isScrolled ? 'bg-surface/50 backdrop-blur-md shadow-md  py-4 px-8 text-text-main dark:text-white rounded-3xl mt-10' : 'text-white bg-transparent py-12 px-12'
  ]">
    <div class="text-xl font-bold ">
      Weixies
    </div>

    <div class="flex items-center space-x-6">

      <router-link to="/login" class=" hover:text-primary transition font-medium">
        Login
      </router-link>

      <router-link to="/signup"
        class="bg-primary text-white px-4 py-2 rounded-xl shadow-lg hover:bg-primary-dark transition transform hover:-translate-y-0.5">
        Sign Up
      </router-link>

      <!-- Theme Toggle Button -->
      <button @click="themeStore.toggleTheme()" class="p-2 rounded-full hover:bg-bg-alt transition focus:outline-none">
        <!-- Sun Icon (for Dark Mode) -->
        <svg v-if="themeStore.isDark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <!-- Moon Icon (for Light Mode) -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useThemeStore } from '../stores/themeStore'

const themeStore = useThemeStore()
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
}

onMounted(() => {
  themeStore.initTheme()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
