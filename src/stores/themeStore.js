import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const mode = ref('system') // 'light' | 'dark' | 'system'
    const isDark = ref(false)
    let mediaQuery

    const apply = (dark) => {
        isDark.value = dark
        document.documentElement.classList.toggle('dark', dark)
    }

    const setTheme = (value) => {
        mode.value = value
        localStorage.theme = value

        if (value === 'system') {
            apply(window.matchMedia('(prefers-color-scheme: dark)').matches)
        } else {
            apply(value === 'dark')
        }
    }

    const initTheme = () => {
        const saved = localStorage.theme || 'system'
        mode.value = saved

        if (saved === 'system') {
            mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            apply(mediaQuery.matches)
        } else {
            apply(saved === 'dark')
        }
    }

    const watchSystemTheme = () => {
        if (!mediaQuery) return

        mediaQuery.addEventListener('change', (e) => {
            if (mode.value === 'system') {
                apply(e.matches)
            }
        })
    }

    const toggleTheme = () => {
        if (isDark.value) {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    return {
        mode,
        isDark,
        setTheme,
        initTheme,
        watchSystemTheme,
        toggleTheme
    }
})
