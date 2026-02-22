<script setup>
import DashboardLayout from '../components/layouts/DashboardLayout.vue'
import { useThemeStore } from '../stores/themeStore'

const theme = useThemeStore()
</script>

<template>
    <DashboardLayout>
        <div class="bg-surface rounded-2xl p-8 shadow-sm border border-bg-alt/50">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h1 class="text-3xl font-bold text-text-main">Dashboard</h1>
                    <p class="text-text-muted">Welcome to your dashboard! Manage your activities here.</p>
                </div>

                <!-- Theme Switch -->
                <div class="flex items-center gap-2 bg-bg-alt rounded-xl p-1">
                    <button @click="theme.setTheme('light')" :class="theme.mode === 'light'
                        ? 'bg-surface text-primary shadow-sm'
                        : 'text-text-muted hover:text-text-main'"
                        class="px-4 py-2 rounded-lg font-semibold transition-all">
                        ☀️ Light
                    </button>

                    <button @click="theme.setTheme('dark')" :class="theme.mode === 'dark'
                        ? 'bg-surface text-primary shadow-sm'
                        : 'text-text-muted hover:text-text-main'"
                        class="px-4 py-2 rounded-lg font-semibold transition-all">
                        🌙 Dark
                    </button>

                    <button @click="theme.setTheme('system')" :class="theme.mode === 'system'
                        ? 'bg-surface text-primary shadow-sm'
                        : 'text-text-muted hover:text-text-main'"
                        class="px-4 py-2 rounded-lg font-semibold transition-all">
                        💻 System
                    </button>
                </div>
            </div>
        </div>
    </DashboardLayout>


</template>
