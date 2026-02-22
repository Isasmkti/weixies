<template>
    <DashboardLayout>
        <div class="max-w-3xl mx-auto font-poppins">
            <div class="flex items-center gap-4 mb-8">
                <router-link to="/admin" class="text-text-muted hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </router-link>
                <h1 class="text-3xl font-extrabold text-text-main tracking-tight">{{ isEditMode ? 'Edit Product' :
                    'Create Product' }}</h1>
            </div>

            <div class="bg-surface p-8 rounded-2xl shadow-lg border border-bg-alt">
                <form @submit.prevent="handleSubmit" class="space-y-6">

                    <!-- Name -->
                    <div>
                        <label class="block text-sm font-semibold text-text-main mb-2">Product Name</label>
                        <input v-model="form.name" type="text" required
                            class="w-full rounded-xl border border-bg-alt bg-bg px-4 py-3 focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                            placeholder="e.g. Premium Wireless Headphones">
                    </div>

                    <!-- Slug (Auto-generated or Manual) -->
                    <div>
                        <label class="block text-sm font-semibold text-text-main mb-2">Slug</label>
                        <input v-model="form.slug" type="text" 
                            class="w-full rounded-xl border border-bg-alt bg-bg px-4 py-3 focus:ring-2 focus:ring-primary/30 outline-none transition-all font-mono text-sm"
                            placeholder="e.g. premium-wireless-headphones">
                        <p class="text-xs text-text-muted mt-1">Unique identifier for URL.</p>
                    </div>

                    <!-- Description -->
                    <div>
                        <label class="block text-sm font-semibold text-text-main mb-2">Description</label>
                        <textarea v-model="form.description" rows="4" required
                            class="w-full rounded-xl border border-bg-alt bg-bg px-4 py-3 focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                            placeholder="Detailed product description..."></textarea>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Price -->
                        <div>
                            <label class="block text-sm font-semibold text-text-main mb-2">Price ($)</label>
                            <input v-model.number="form.price" type="number" step="0.01" min="0" required
                                class="w-full rounded-xl border border-bg-alt bg-bg px-4 py-3 focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                                placeholder="0.00">
                        </div>
                    </div>

                    <!-- Image URL -->
                    <div>
                        <label class="block text-sm font-semibold text-text-main mb-2">Image URL</label>
                        <input v-model="form.image_url" type="url"
                            class="w-full rounded-xl border border-bg-alt bg-bg px-4 py-3 focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                            placeholder="https://example.com/image.jpg">

                        <!-- Image Preview -->
                        <div v-if="form.image_url"
                            class="mt-4 h-48 w-full rounded-xl bg-bg-alt overflow-hidden border border-bg-alt relative group">
                            <img :src="form.image_url" alt="Preview" class="w-full h-full object-contain">
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="pt-4">
                        <button type="submit" :disabled="loading"
                            class="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2">
                            <svg v-if="loading" class="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <span>{{ isEditMode ? 'Update Product' : 'Create Product' }}</span>
                        </button>
                    </div>

                    <!-- Error Message -->
                    <div v-if="error" class="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-200">
                        {{ error }}
                    </div>
                </form>
            </div>
        </div>
    </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DashboardLayout from '../../components/layouts/DashboardLayout.vue'
import { useProductsStore } from '../../stores/productsStore'
import { sGetById } from '../../services/productsService'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()

const isEditMode = computed(() => !!route.params.id)
const loading = ref(false)
const error = ref(null)

const form = ref({
    name: '',
    description: '',
    price: 0,
    image_url: ''
})

onMounted(async () => {
    if (isEditMode.value) {
        loading.value = true
        try {
            const product = await sGetById(route.params.id)
            if (product) {
                form.value = { ...product }
            }
        } catch (err) {
            error.value = 'Failed to load product details'
            console.error(err)
        } finally {
            loading.value = false
        }
    }
})

const handleSubmit = async () => {
    loading.value = true
    error.value = null

    try {
        if (isEditMode.value) {
            await productsStore.updateProduct(route.params.id, form.value)
        } else {
            await productsStore.createProduct(form.value)
        }
        router.push('/admin')
    } catch (err) {
        error.value = err.message || 'Failed to save product'
    } finally {
        loading.value = false
    }
}
</script>