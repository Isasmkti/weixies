<template>
    <div class="bg-primary" v-if="store.cta">
        <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 md:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span class="block">{{ store.cta.title }}</span>
                <span class="block text-indigo-100 opacity-90">{{ store.cta.subtitle }}</span>
            </h2>
            <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <div class="inline-flex rounded-md shadow">
                    <a href="#"
                        class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-bg-alt">
                        {{ store.cta.btnPrimary }}
                    </a>
                </div>
                <div class="ml-3 inline-flex rounded-md shadow">
                    <a href="#"
                        class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-dark hover:bg-primary">
                        {{ store.cta.btnSecondary }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useWelcomeStore } from '../stores/welcomeStore'
const store = useWelcomeStore()
</script>
