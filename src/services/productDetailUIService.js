import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../stores/productsStore'
import { useCartStore } from '../stores/cartStore'
import { getUser } from '../services/authService'

export function useProductDetailUI(slug) {
  const router = useRouter()
  const productsStore = useProductsStore()
  const cartStore = useCartStore()

  const product = ref(null)
  const loading = ref(true)
  const error = ref('')
  const addingToCart = ref(false)

  const formattedPrice = computed(() => {
    const amount = Number(product.value?.price ?? 0)
    if (!Number.isFinite(amount)) return '$0.00'
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  })

  const fetchProduct = async () => {
    loading.value = true
    error.value = ''
    try {
      const foundProduct = await productsStore.sGetBySlug(slug)
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
  watch(() => slug, fetchProduct)

  return {
    product,
    loading,
    error,
    addingToCart,
    formattedPrice,
    addToCart
  }
}
