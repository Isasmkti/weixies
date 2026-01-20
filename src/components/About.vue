<template>
    <div class="py-16 md:py-24 bg-bg-alt overflow-hidden" v-if="store.about">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h2 class="text-2xl font-semibold text-primary tracking-wide uppercase">{{ store.about.title }}</h2>
                <p class="mt-1 text-lg font-extrabold text-text-main sm:text-5xl sm:tracking-tight lg:text-6xl">
                    {{ store.about.subtitle }}
                </p>
                <p class="max-w-xl mt-5 mx-auto text-xl text-text-muted">
                    {{ store.about.description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useWelcomeStore } from '../stores/welcomeStore'
const store = useWelcomeStore()
</script>
