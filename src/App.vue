<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from './stores/themeStore'

const theme = useThemeStore()

onMounted(() => {
    theme.initTheme()
    theme.watchSystemTheme()
})
</script>

<template>
    <router-view />
</template>
