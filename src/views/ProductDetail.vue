<template>
    <div v-if="product">
        <h1>{{ product.name }}</h1>
        <p>{{ product.description }}</p>
        <p>{{ product.price }}</p>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '../stores/productsStore'

const route = useRoute()
const productsStore = useProductsStore()

const product = ref(null)

onMounted(async () => {
    try {
        const slug = route.params.slug
        product.value = await productsStore.sGetBySlug(slug)
    } catch (error) {
        console.error('Error fetching product:', error)
    }
})

</script>