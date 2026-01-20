<template>
  <div class="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-bg-alt">

    <!-- Loading -->
    <div
      v-if="store.loading"
      class="absolute inset-0 z-50 flex items-center justify-center bg-bg-alt/70 backdrop-blur-md"
    >
      <div class="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
    </div>

    <!-- Error -->
    <div
      v-else-if="store.error"
      class="absolute inset-0 z-50 flex items-center justify-center"
    >
      <p class="bg-surface text-text px-6 py-4 rounded-xl shadow-lg font-medium">
        Error: {{ store.error }}
      </p>
    </div>

    <!-- Hero -->
     
    <template v-else-if="currentItem">
        <MotionGroup preset="fade" :duration="1000" :delay="500">
      <!-- Background -->
      <div class="absolute inset-0">
        
        <img
          :src="currentItem.image"
          alt="Hero Background"
          class="h-full w-full object-cover"
        />
        

        <!-- Soft radial gradient -->
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.25),rgba(0,0,0,0.65))]"></div>

        <!-- Subtle primary tint -->
        <div class="absolute inset-0 bg-primary/10"></div>

        <!-- Bottom fade -->
        <div class="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-bg-alt to-transparent"></div>
      </div>
     </MotionGroup>

      <!-- Content -->
      <MotionGroup preset="fade" :duration="1000" :delay="1000">
      <main class="relative z-10 max-w-4xl mx-auto px-6 text-center pt-28 pb-16">
        <h1
          class="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight"
        >
          {{ currentItem.title }}
        </h1>

        <p
          class="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/85 leading-relaxed"
        >
          {{ currentItem.description }}
        </p>

        <!-- CTA -->
        <div class="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#"
            class="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-primary shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            Get Started
          </a>

          <a
            href="#"
            class="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3 text-base font-medium text-white hover:bg-white/10 transition"
          >
            Live Demo
          </a>
        </div>
      </main>
      </MotionGroup>
       
    </template>
   
  </div>
</template>


<script setup>
import { onMounted, computed } from 'vue'
import { useWelcomeStore } from '../stores/welcomeStore'

const store = useWelcomeStore()

const currentItem = computed(() => {
    return store.hero
})

onMounted(() => {
    store.stAll()
})
</script>
