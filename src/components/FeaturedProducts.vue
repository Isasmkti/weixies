<template>
    <div class="bg-bg-alt overflow-hidden py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <h2 class="text-5xl font-extrabold tracking-tight text-text-main text-center">Products Overview</h2>
            <p class="mt-4 max-w-2xl text-xl text-text-muted mx-auto text-center">
                Explore our portfolio of successful products.
            </p>
        </div>

        <!-- Carousel Container -->
        <div class="relative w-full flex overflow-x-hidden group">
            <!-- Scrolling Track (Duplicated for infinite effect) -->
            <div class="animate-scroll flex space-x-6">
                <!-- Original List -->
                <div v-for="project in store.products" :key="project.id"
                    class="flex-none w-[300px] sm:w-[400px] h-64 relative rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                    <img :src="project.imageSrc" :alt="project.imageAlt" class="w-full h-full object-cover">
                    <div
                        class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <h3 class="text-white text-xl font-bold">{{ project.name }}</h3>
                    </div>
                </div>

                <!-- Duplicated List for seamless loop -->
                <div v-for="project in store.products" :key="'dup-' + project.id"
                    class="flex-none w-[300px] sm:w-[400px] h-64 relative rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                    <img :src="project.imageSrc" :alt="project.imageAlt" class="w-full h-full object-cover">
                    <div
                        class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <h3 class="text-white text-xl font-bold">{{ project.name }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-scroll {
    display: flex;
    width: max-content;
    animation: scroll 30s linear infinite;
}

/* Pause animation when the parent group is hovered */
.group:hover .animate-scroll {
    animation-play-state: paused;
}

@keyframes scroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
        /* Move half the width (the length of one full set) */
    }
}
</style>

<script setup>
import { useWelcomeStore } from '../stores/welcomeStore'
const store = useWelcomeStore()
</script>
