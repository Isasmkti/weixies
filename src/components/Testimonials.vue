<template>
    <section class="py-16 bg-surface overflow-hidden md:py-24">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="relative">
                <div class="text-center">
                    <h2 class="text-3xl font-extrabold text-text-main sm:text-4xl">
                        Trusted by Developers
                    </h2>
                    <p class="mt-4 text-lg text-text-muted">
                        Here is what our customers have to say about our products and services.
                    </p>
                </div>
                <div class="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
                    <div v-for="testimonial in store.testimonials" :key="testimonial.id"
                        class="bg-bg-alt rounded-xl p-8 shadow-sm">
                        <blockquote class="mt-2 text-text-main">
                            <p class="text-lg font-medium">"{{ testimonial.quote }}"</p>
                        </blockquote>
                        <div class="mt-6 flex items-center">
                            <img class="h-10 w-10 rounded-full bg-gray-300" :src="testimonial.image" alt="" />
                            <div class="ml-4">
                                <div class="text-base font-semibold text-text-main">{{ testimonial.author }}</div>
                                <div class="text-base text-text-muted">{{ testimonial.role }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useWelcomeStore } from '../stores/welcomeStore'
const store = useWelcomeStore()
</script>
