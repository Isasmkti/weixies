import { defineStore } from 'pinia'
import * as cartService from '../services/cartService'

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: null,
        items: [],
        loading: false,
        error: null
    }),
    actions: {
        async stGetCart(profileId) {
            if (!profileId) return
            try {
                this.loading = true
                this.error = null
                const { cart, items } = await cartService.sGetCart(profileId)
                this.cart = cart
                this.items = items
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        },
        async stAddToCart(profileId, productId) {
            if (!profileId) return
            try {
                this.loading = true
                this.items = await cartService.sAddToCart(profileId, productId)
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        },
        async stRemoveFromCart(itemId) {
            try {
                this.loading = true
                await cartService.sRemoveFromCart(itemId)
                this.items = this.items.filter(i => i.id !== itemId)
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        }
    }
})
