import { defineStore } from 'pinia'
import * as productsService from '../services/productsService'

const FETCH_TIMEOUT_MS = 15000

function withTimeout(promise, timeoutMs = FETCH_TIMEOUT_MS) {
    let timeoutId

    return Promise.race([
        promise,
        new Promise((_, reject) => {
            timeoutId = setTimeout(() => {
                reject(new Error('Request timed out while loading products'))
            }, timeoutMs)
        })
    ]).finally(() => {
        clearTimeout(timeoutId)
    })
}

export const useProductsStore = defineStore('products', {
    state: () => ({
        products: [],
        total: 0,
        page: 1,
        limit: 10,
        sortBy: 'created_at',
        sortOrder: 'desc',
        search: '',
        requestId: 0,
        loading: false,
        error: null
    }),
    getters: {
        totalPages(state) {
            return Math.ceil(state.total / state.limit)
        }
    },

    actions: {


        async stAll(page) {
            const targetPage = Number.isFinite(page) && page > 0 ? page : this.page
            const current = ++this.requestId
            this.loading = true
            this.error = null

            try {
                const res = await withTimeout(
                    productsService.sAll(
                        targetPage,
                        this.limit,
                        this.sortBy,
                        this.sortOrder,
                        this.search
                    )
                )

                if (current !== this.requestId) return

                this.products = Array.isArray(res?.data) ? res.data : []
                this.total = Number(res?.total) || 0
                this.page = targetPage
            } catch (err) {
                if (current === this.requestId) {
                    this.error = err.message || 'Failed to load products'
                }
            } finally {
                // ⚠️ hanya request TERAKHIR yang boleh matiin loading
                if (current === this.requestId) {
                    this.loading = false
                }
            }
        },

        setSearch(val) {
            this.search = val
            this.page = 1
            this.stAll(1)
        },

        changeSort(sort) {
            this.sortBy = sort.by
            this.sortOrder = sort.order
            this.page = 1
            this.stAll(1)
        },

        async sGetBySlug(slug) {
            try {
                return await productsService.sGetBySlug(slug)
            } catch (error) {
                throw error
            }
        },

        async createProduct(product) {
            this.loading = true
            try {
                const newProduct = await productsService.sCreate(product)
                this.products.unshift(newProduct) // Add to list if needed, or just let caller handle refresh
                return newProduct
            } catch (error) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateProduct(id, product) {
            this.loading = true
            try {
                const updated = await productsService.sUpdate(id, product)
                const index = this.products.findIndex(p => p.id === id)
                if (index !== -1) {
                    this.products[index] = updated
                }
                return updated
            } catch (error) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteProduct(id) {
            this.loading = true
            try {
                await productsService.sDelete(id)
                this.products = this.products.filter(p => p.id !== id)
            } catch (error) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        }

    }
})
