import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductsStore } from '../stores/productsStore'
import { useCartStore } from '../stores/cartStore'
import { getUser } from '../services/authService'

export function useProductDetailUI(initialSlug) {
  const router = useRouter()
  const route = useRoute()
  const productsStore = useProductsStore()
  const cartStore = useCartStore()

  const product = ref(null)
  const loading = ref(true)
  const error = ref('')
  const addingToCart = ref(false)

  const productImages = computed(() => {
    if (!product.value) return []
    if (product.value.product_images && product.value.product_images.length > 0) {
      // Sort so primary image comes first
      return [...product.value.product_images].sort((a, b) => Number(b.is_primary) - Number(a.is_primary))
    }
    if (product.value.image_url) {
      return [{ image_url: product.value.image_url, is_primary: true }]
    }
    return []
  })

  const selectedImage = ref('')

  watch(productImages, (images) => {
    if (images.length > 0) {
      // Select primary image if exists, else first
      const primary = images.find(img => img.is_primary)
      selectedImage.value = primary ? primary.image_url : images[0].image_url
    } else {
      selectedImage.value = ''
    }
  }, { immediate: true })

  const formattedPrice = computed(() => {
    const amount = Number(product.value?.price ?? 0)
    if (!Number.isFinite(amount)) return '$0.00'
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  })

  const fetchProduct = async () => {
    const slug = route.params.slug || initialSlug
    if (!slug) return
    loading.value = true
    error.value = ''
    try {
      const foundProduct = await productsStore.sGetBySlug(slug)
      console.log('[ProductDetailUIService] Fetched product data:', foundProduct)
      console.log('[ProductDetailUIService] Product images:', foundProduct?.product_images)
      if (!foundProduct) {
        throw new Error('The product could not be found.')
      }
      product.value = foundProduct
    } catch (err) {
      product.value = null
      error.value = err.message || 'Failed to load this product.'
      console.error('Error fetching product:', err)
    } finally {
      loading.value = false
    }
  }

  const addToCart = async () => {
    if (!product.value?.id) return
    const user = await getUser()
    if (!user) {
      router.push('/login')
      return
    }
    try {
      addingToCart.value = true
      await cartStore.stAddToCart(user.id, product.value.id)
    } catch (err) {
      console.error('Failed to add to cart:', err)
    } finally {
      addingToCart.value = false
    }
  }

  onMounted(fetchProduct)
  watch(() => route.params.slug, fetchProduct)

  return {
    product,
    loading,
    error,
    addingToCart,
    formattedPrice,
    addToCart,
    productImages,
    selectedImage
  }
}
