<template>
  <DashboardLayout>
    <div class="max-w-[1600px] mx-auto font-poppins">
      <div class="flex justify-between items-end mb-10">
        <div>
          <h1 class="text-4xl font-extrabold text-text-main tracking-tight mb-2">
            Product Catalog
          </h1>
          <p class="text-text-muted font-montserrat">
            Discover our exclusive collection of premium items.
          </p>
        </div>
      </div>
      <!-- search -->
      <div class="relative w-full sm:w-80 mb-10">
        <input
          v-model="searchInput"
          type="text"
          placeholder="Search products..."
          class="w-full rounded-xl border border-bg-alt bg-surface px-4 py-2.5 pr-10 text-text-main focus:ring-2 focus:ring-primary/30"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35M16.65 11A5.65 5.65 0 1111 5.35a5.65 5.65 0 015.65 5.65z"
          />
        </svg>
      </div>

      <!-- category filter -->
      <div v-if="categories.length > 0" class="flex flex-wrap gap-2 mb-10">
        <button
          @click="setCategory('')"
          :class="[
            'px-6 py-2.5 rounded-xl font-semibold transition-all duration-300',
            !selectedCategory
              ? 'bg-primary text-white shadow-lg shadow-primary/30'
              : 'bg-surface text-text-muted hover:bg-primary/10 hover:text-primary border border-bg-alt/50 hover:border-primary/30'
          ]"
        >
          All Items
        </button>
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="setCategory(cat.slug)"
          :class="[
            'px-6 py-2.5 rounded-xl font-semibold transition-all duration-300',
            selectedCategory === cat.slug
              ? 'bg-primary text-white shadow-lg shadow-primary/30'
              : 'bg-surface text-text-muted hover:bg-primary/10 hover:text-primary border border-bg-alt/50 hover:border-primary/30'
          ]"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- sort by -->
      <div class="flex items-center gap-3 mb-10">
        <span class="text-sm text-text-muted font-semibold">Sort by:</span>

        <select
          @change="onSortChange"
          class="bg-surface border border-bg-alt rounded-xl px-4 py-2 text-text-main font-semibold focus:ring-2 focus:ring-primary/30"
        >
          <option value="created_at-desc">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A–Z</option>
        </select>
      </div>

      <div v-if="loading" class="flex flex-col items-center justify-center py-24">
        <div
          class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary shadow-lg shadow-primary/30"
        ></div>
        <p class="mt-4 text-text-muted font-medium animate-pulse">Loading products...</p>
      </div>

      <div
        v-else-if="error"
        class="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-6 py-4 rounded-2xl flex items-center gap-3"
        role="alert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <strong class="font-bold block">Error loading products</strong>
          <span class="block text-sm">{{ error }}</span>
        </div>
      </div>

      <div
        v-else-if="!products.length"
        class="flex flex-col items-center justify-center py-24 text-center"
      >
        <div
          class="bg-surface rounded-full p-6 mb-6 shadow-xl shadow-black/5 ring-1 ring-bg-alt"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-text-muted/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-text-main mb-2">No products found</h3>
        <p class="text-text-muted max-w-sm font-montserrat">
          We couldn't find any products matching your current search or filters. Try using
          different keywords.
        </p>
        <button
          v-if="searchInput"
          @click="searchInput = ''"
          class="mt-8 text-primary font-semibold hover:underline"
        >
          Clear search query
        </button>
      </div>

      <div
        v-else
        class="grid items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
      >
        <div
          v-for="product in products"
          :key="product.id"
          @click="router.push(`/products/${product.slug}`)"
          class="group bg-surface rounded-2xl shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-bg-alt overflow-hidden flex flex-col h-full"
        >
          <!-- Image Container -->
          <!-- Aspect ratio 16:9 for more width -->
          <div class="relative aspect-[4/3] overflow-hidden bg-bg-alt">
            <img
              v-if="product.image_url"
              :src="product.image_url"
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <defaultProduct
              v-else
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <!-- Overlay gradient -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>

            <div
              class="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-text-main shadow-sm"
            >
              New
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 flex flex-col flex-grow">
            <h3
              class="text-lg font-bold text-text-main mb-1 line-clamp-1 group-hover:text-primary transition-colors font-poppins"
            >
              {{ product.name }}
            </h3>
            <div class="flex flex-wrap gap-1 mb-2">
              <span 
                v-for="cat in product.categories" 
                :key="cat.id" 
                class="text-[10px] uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-md"
              >
                {{ cat.name }}
              </span>
              <span v-if="!product.categories?.length" class="text-[10px] text-text-muted italic">
                Uncategorized
              </span>
            </div>
            <p
              class="text-text-muted text-sm mb-4 line-clamp-2 flex-grow font-montserrat"
            >
              {{ product.description }}
            </p>

            <div
              class="flex justify-between items-center mt-auto pt-4 border-t border-bg-alt"
            >
              <div class="flex flex-col">
                <span
                  class="text-xs text-text-muted uppercase tracking-wider font-semibold"
                  >Price</span
                >
                <span class="text-xl font-extrabold text-text-main font-poppins"
                  >{{ formatIDR(product.price) }}</span
                >
              </div>

             <button
  @click.stop="
    isInCart(product.id)
      ? router.push('/cart')
      : addToCart(product.id)
  "
  :disabled="addingToCart === product.id"
  :class="[
    'relative overflow-hidden px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed',
    isInCart(product.id)
      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30'
      : 'bg-primary hover:bg-primary-dark text-white shadow-primary/25 hover:shadow-primary/40'
  ]"
>
  <span class="flex items-center gap-2 font-medium">
    
    <!-- Loading -->
    <span
      v-if="addingToCart === product.id"
      class="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
    ></span>

    <!-- Dynamic Icon -->
    <svg
      v-else-if="!isInCart(product.id)"
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>

    <!-- Check Icon -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 13l4 4L19 7"
      />
    </svg>

    {{
      addingToCart === product.id
        ? "Adding..."
        : isInCart(product.id)
        ? "Go to Cart"
        : "Add"
    }}
  </span>
</button>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <div
      v-if="products.length > 0"
      class="flex justify-center items-center gap-6 mt-16 font-poppins"
    >
      <!-- Prev -->
      <button
        :disabled="productsStore.page === 1"
        @click="productsStore.stAll(productsStore.page - 1)"
        class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-surface border border-bg-alt text-text-main hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface disabled:hover:text-text-main"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Prev
      </button>

      <!-- Page Info -->
      <div
        class="px-6 py-2 rounded-xl bg-bg-alt text-text-muted font-semibold tracking-wide"
      >
        Page
        <span class="text-text-main font-extrabold">
          {{ productsStore.page }}
        </span>
        /
        <span>
          {{ productsStore.totalPages }}
        </span>
      </div>

      <!-- Next -->
      <button
        :disabled="productsStore.page === productsStore.totalPages"
        @click="productsStore.stAll(productsStore.page + 1)"
        class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-primary text-white shadow-md shadow-primary/30 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary"
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { computed } from "vue";
import defaultProduct from "../components/defaultProduct.vue";
import { useCatalogUI } from "../services/catalogUIService";
import DashboardLayout from "../components/layouts/DashboardLayout.vue";
import router from "../router/index";

const {
  products,
  categories,
  selectedCategory,
  loading,
  error,
  searchInput,
  addingToCart,
  onSortChange,
  setCategory,
  addToCart,
  getMainImage,
  productsStore,
  cartStore,
  formatIDR
} = useCatalogUI();

// reactive check
const isInCart = (productId) => {
    if (!productId) return false;
    const inList = (cartStore?.items ?? []).some((item) => item.product_id === productId);
    const isAdding = cartStore?.addingProducts?.[productId];
    return inList || isAdding;
};
</script>
