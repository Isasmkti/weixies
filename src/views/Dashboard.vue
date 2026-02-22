<script setup>
import { onMounted } from 'vue'
import DashboardLayout from '../components/layouts/DashboardLayout.vue'
import { useThemeStore } from '../stores/themeStore'
import { useAuth } from '../composables/useAuth'

const theme = useThemeStore()
const { profile, fetchProfile } = useAuth()

onMounted(async () => {
    await fetchProfile()
})
</script>

<template>
    <DashboardLayout>
        <div class="max-w-5xl mx-auto space-y-10 py-6">
            <!-- Hero Profile Section -->
            <div
                class="relative overflow-hidden bg-surface rounded-[2.5rem] p-12 shadow-2xl shadow-black/[0.03] border border-bg-alt/50 group">
                <!-- Luxury Glow Decor -->
                <div
                    class="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-all duration-700">
                </div>
                <div
                    class="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-all duration-700">
                </div>

                <div class="relative flex flex-col items-center text-center">
                    <!-- Profile Avatar -->
                    <div class="relative mb-8 pt-4">
                        <div
                            class="w-32 h-32 rounded-3xl bg-surface border-4 border-bg-alt shadow-2xl flex items-center justify-center overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img v-if="profile?.profile_img" :src="profile.profile_img" alt="Profile"
                                class="w-full h-full object-cover">
                            <div v-else
                                class="w-full h-full bg-gradient-to-br from-bg-alt to-surface flex items-center justify-center">
                                <span class="text-text-muted font-black text-4xl uppercase">{{
                                    profile?.full_name?.charAt(0) || 'U' }}</span>
                            </div>
                        </div>
                        <div
                            class="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-2xl border-4 border-surface shadow-xl flex items-center justify-center">
                            <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    <!-- Identity Info -->
                    <div class="space-y-4 max-w-2xl">
                        <div class="space-y-1">
                            <h3 class="text-primary font-bold tracking-[0.2em] uppercase text-sm">Welcome back</h3>
                            <h1 class="text-5xl font-black text-text-main tracking-tight leading-tight">
                                {{ profile?.full_name || 'Explorer' }}
                            </h1>
                        </div>

                        <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
                            <span
                                class="px-5 py-2 rounded-2xl bg-primary/5 text-primary text-sm font-bold border border-primary/10 backdrop-blur-sm">
                                {{ profile?.role || 'Member' }}
                            </span>
                            <span
                                class="px-5 py-2 rounded-2xl bg-bg-alt/50 text-text-muted text-sm font-medium border border-bg-alt/30">
                                Verified Account
                            </span>
                        </div>
                    </div>

                    <!-- Quick Stats/Actions -->
                    <div class="mt-12 flex flex-wrap justify-center gap-4">
                        <button
                            class="px-8 py-3.5 bg-primary text-white rounded-2xl font-bold shadow-[0_10px_30px_rgba(var(--primary-rgb),0.3)] hover:bg-primary-dark hover:-translate-y-1 transition-all">
                            Manage Portfolio
                        </button>
                        <button
                            class="px-8 py-3.5 bg-surface border-2 border-bg-alt text-text-main rounded-2xl font-bold hover:bg-bg-alt/50 hover:-translate-y-1 transition-all">
                            View Settings
                        </button>
                    </div>
                </div>
            </div>

            <!-- Settings / Preferences Section -->
            <div class="bg-surface rounded-3xl p-8 shadow-xl shadow-black/[0.02] border border-bg-alt/50">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 class="text-2xl font-black text-text-main tracking-tight">System Preferences</h2>
                        <p class="text-text-muted font-medium">Personalize your interface and workspace settings.</p>
                    </div>

                    <!-- Theme Switch UI -->
                    <div
                        class="flex items-center gap-1.5 bg-bg-alt/50 backdrop-blur-md rounded-2xl p-1.5 border border-bg-alt/50">
                        <button v-for="mode in ['light', 'dark', 'system']" :key="mode" @click="theme.setTheme(mode)"
                            :class="theme.mode === mode
                                ? 'bg-surface text-primary shadow-sm scale-100'
                                : 'text-text-muted hover:text-text-main hover:bg-bg-alt scale-95'"
                            class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm capitalize transition-all duration-300">
                            <component :is="mode === 'light' ? 'span' : 'span'">
                                {{ mode === 'light' ? '☀️' : mode === 'dark' ? '🌙' : '💻' }}
                            </component>
                            {{ mode }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </DashboardLayout>
</template>
