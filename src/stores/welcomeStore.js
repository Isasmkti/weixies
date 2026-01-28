import { defineStore } from 'pinia'
import * as welcomeService from '../services/welcomeService'

export const useWelcomeStore = defineStore('welcome', {
  state: () => ({
    hero: null,
    about: null,
    features: [],
    products: [],
    testimonials: [],
    cta: null,
    loading: false,
    error: null
  }),
  actions: {
    async stAll() {
      try {
        this.loading = true
        const data = await welcomeService.sAll() 
        this.hero = data.hero
        this.about = data.about
        this.features = data.features
        this.products = data.products
        this.testimonials = data.testimonials
        this.cta = data.cta
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})