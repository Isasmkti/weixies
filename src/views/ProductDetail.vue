<template>
    <DashboardLayout>
        <div class="max-w-6xl mx-auto font-poppins">
            <div v-if="loading" class="bg-surface rounded-3xl border border-bg-alt/60 p-12 text-center shadow-lg">
                <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary">
                </div>
                <p class="mt-4 text-text-muted font-semibold">Loading product details...</p>
            </div>

            <div v-else-if="error" class="bg-surface rounded-3xl border border-bg-alt/60 p-12 text-center shadow-lg">
                <h2 class="text-2xl font-bold text-text-main mb-2">Product not available</h2>
                <p class="text-text-muted mb-6">{{ error }}</p>
                <router-link to="/products"
                    class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-white hover:bg-primary-dark transition-colors">
                    Back to Catalog
                </router-link>
            </div>

            <div v-else-if="product" class="space-y-6">
                <div class="flex items-center justify-between gap-4">
                    <router-link to="/products"
                        class="inline-flex items-center gap-2 text-text-muted hover:text-primary font-semibold transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Catalog
                    </router-link>
                    <span
                        class="rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                        {{ product.slug ? `#${product.slug}` : '#product' }}
                    </span>
                </div>

                <section
                    class="relative overflow-hidden rounded-[2rem] border border-bg-alt/60 bg-surface p-6 md:p-10 shadow-2xl shadow-black/[0.03]">
                    <div class="pointer-events-none absolute inset-0 pattern-grid opacity-30"></div>
                    <div
                        class="pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-[90px]">
                    </div>
                    <div
                        class="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px]">
                    </div>

                    <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div class="space-y-4">
                            <!-- Main Large Image -->
                            <div class="rounded-3xl border border-bg-alt bg-bg-alt/50 p-4">
                                <div class="aspect-square w-full overflow-hidden rounded-2xl bg-bg flex items-center justify-center">
                                    <img v-if="selectedImage" :src="selectedImage" :alt="product.name"
                                        class="h-full w-full object-cover transition-all duration-300">
                                    <defaultProduct v-else class="h-40 w-40 text-text-muted/60" />
                                </div>
                            </div>
                            
                            <!-- Thumbnails -->
                            <div v-if="productImages && productImages.length > 0" class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                <button v-for="(img, idx) in productImages" :key="idx" 
                                    @click="selectedImage = img.image_url"
                                    :class="['flex-shrink-0 h-20 w-20 rounded-xl overflow-hidden border-2 transition-all', 
                                            selectedImage === img.image_url ? 'border-primary shadow-md' : 'border-bg-alt opacity-70 hover:opacity-100']">
                                    <img :src="img.image_url" :alt="`${product.name} image ${idx + 1}`" class="w-full h-full object-cover">
                                </button>
                            </div>
                        </div>

                        <div class="space-y-6">
                            <div class="space-y-3">
                                <span
                                    class="inline-flex rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                                    Product Detail
                                </span>
                                <h1
                                    class="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
                                    {{ product.name }}
                                </h1>
                                <p class="text-text-muted leading-relaxed text-base md:text-lg">
                                    {{ product.description || 'No description available for this product yet.' }}
                                </p>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div class="rounded-2xl border border-bg-alt bg-bg/70 p-4">
                                    <p class="text-xs uppercase tracking-widest text-text-muted font-semibold">Price</p>
                                    <p class="text-3xl font-black text-text-main mt-2">{{ formattedPrice }}</p>
                                </div>
                                <div class="rounded-2xl border border-bg-alt bg-bg/70 p-4">
                                    <p class="text-xs uppercase tracking-widest text-text-muted font-semibold">Status
                                    </p>
                                    <p class="text-lg font-bold text-primary mt-2">Available</p>
                                </div>
                            </div>

                            <div class="flex flex-wrap gap-3 pt-2">
                                <button @click="addToCart" :disabled="addingToCart"
                                    class="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary-dark hover:shadow-primary/40 disabled:cursor-not-allowed disabled:opacity-70">
                                    <span v-if="addingToCart"
                                        class="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    {{ addingToCart ? 'Adding...' : 'Add to Cart' }}
                                </button>

                                <router-link to="/products"
                                    class="inline-flex items-center gap-2 rounded-xl border border-bg-alt bg-bg px-6 py-3 font-semibold text-text-main hover:border-primary/30 hover:text-primary transition-colors">
                                    Continue Shopping
                                </router-link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </DashboardLayout>
</template>

<script setup>

const props = defineProps({
    slug: {
        type: String,
        required: true
    }
})

import defaultProduct from '../components/defaultProduct.vue'
import { useProductDetailUI } from '../services/productDetailUIService'
import DashboardLayout from '../components/layouts/DashboardLayout.vue'
// import router from '../router/index';

const {
    product,
    loading,
    error,
    addingToCart,
    formattedPrice,
    addToCart,
    productImages,
    selectedImage
} = useProductDetailUI(props.slug)
</script>

<style scoped>
.pattern-grid {
    background-image: radial-gradient(circle at 1px 1px, rgb(var(--color-primary) / 0.14) 1px, transparent 0);
    background-size: 22px 22px;
}
</style>
