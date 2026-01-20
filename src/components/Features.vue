<template>
    <div class="py-16 md:py-24 bg-surface">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="lg:text-center">
                <h2 class="text-base text-primary font-semibold tracking-wide uppercase">Why Choose Us</h2>
                <p class="mt-2 text-5xl leading-8 font-extrabold tracking-tight text-text-main sm:text-4xl">
                    A better way to shop online
                </p>
                <p class="mt-4 max-w-2xl text-xl text-text-muted lg:mx-auto">
                    We prioritize your experience with top-tier services and premium quality products.
                </p>
            </div>

            <div class="mt-10">
                <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                    <div v-for="feature in store.features" :key="feature.name" class="relative">
                        <dt>
                            <div
                                class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                <component :is="getIcon(feature.icon)" class="h-6 w-6" aria-hidden="true" />
                            </div>
                            <p class="ml-16 text-lg leading-6 font-medium text-text-main">{{ feature.name }}</p>
                        </dt>
                        <dd class="mt-2 ml-16 text-base text-text-muted">
                            {{ feature.description }}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</template>

<script setup>
import { h } from 'vue'
import { useWelcomeStore } from '../stores/welcomeStore'

const store = useWelcomeStore()

const GlobeIcon = h('svg', { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
    h('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })
])

const ScaleIcon = h('svg', { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
    h('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" })
])

const LightningBoltIcon = h('svg', { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
    h('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" })
])

const ShieldCheckIcon = h('svg', { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
    h('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
])

const iconMap = {
    'globe': GlobeIcon,
    'scale': ScaleIcon,
    'lightning': LightningBoltIcon,
    'shield': ShieldCheckIcon
}

const getIcon = (iconName) => {
    return iconMap[iconName] || GlobeIcon
}
</script>
