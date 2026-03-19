import { ref, computed, watch, onMounted } from 'vue'
import { useProductsStore } from '../stores/productsStore'
import { useCartStore } from '../stores/cartStore'
import { getUser } from '../services/authService'
import { useRouter } from 'vue-router'

export function useCatalogUI() {
  const router = useRouter()
  const productsStore = useProductsStore()
  const cartStore = useCartStore()

  const products = computed(() => productsStore.products)
  const loading = computed(() => productsStore.loading)
  const error = computed(() => productsStore.error)

  const addingToCart = ref(null)
  const searchInput = ref('')
  let timeout = null

  watch(searchInput, (val) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      productsStore.setSearch(val)
    }, 400)
  })

  onMounted(async () => {
    await productsStore.stAll()
  })

  const onSortChange = (e) => {
    const [by, order] = e.target.value.split('-')
    productsStore.changeSort({ by, order })
  }

  const addToCart = async (productId) => {
    const user = await getUser()
    if (!user) {
      router.push('/login')
      return
    }
    try {
      addingToCart.value = productId
      await cartStore.stAddToCart(user.id, productId)
    } catch (err) {
      console.error('Failed to add to cart:', err)
    } finally {
      addingToCart.value = null
    }
  }

  const getMainImage = (product) => {
    if (product?.product_images && product.product_images.length > 0) {
      const main = product.product_images.find(img => img.is_primary)
      if (main && main.image_url) return main.image_url
      if (product.product_images[0]?.image_url) return product.product_images[0].image_url
    }
    if (product?.image_url) return product.image_url
    return null;
  }

  return {
    products,
    loading,
    error,
    searchInput,
    addingToCart,
    onSortChange,
    addToCart,
    getMainImage,
    productsStore,
    cartStore
  }
}
