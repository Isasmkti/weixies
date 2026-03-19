<template>
  <nav :class="[
    'fixed top-0 left-0 w-full z-50 flex justify-between items-center transition-all duration-300',
    isScrolled ? 'bg-surface/40 backdrop-blur-md shadow-md  py-4 px-8 text-text-main dark:text-white rounded-[40px] mt-10' : 'text-white bg-transparent py-12 px-12'
  ]">
    <div class="text-xl font-bold ">
      Weixies
    </div>

    <div class="flex items-center space-x-6">

      <template v-if="!profile">
        <router-link to="/login" class=" hover:text-primary transition font-medium">
          Login
        </router-link>

        <router-link to="/signup"
          class="bg-primary text-white px-4 py-2 rounded-xl shadow-lg hover:bg-primary-dark transition transform hover:-translate-y-0.5">
          Sign Up
        </router-link>
      </template>

      <template v-else>
        <router-link to="/dashboard"
          class="bg-primary text-white px-4 py-2 rounded-xl shadow-lg hover:bg-primary-dark transition transform hover:-translate-y-0.5 font-medium">
          Dashboard
        </router-link>
      </template>



    </div>
  </nav>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useAuth } from '../composables/useAuth'

const { profile, fetchProfile } = useAuth()
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  await fetchProfile()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
