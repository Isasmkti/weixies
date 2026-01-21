<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { profile, fetchProfile, signOut } = useAuth()
const isCollapsed = ref(false)

onMounted(async () => {
    await fetchProfile()
})

const handleLogout = async () => {
    await signOut()
    router.push('/login')
}
</script>

<template>
    <aside
        :class="['bg-surface shadow-[4px_0_24px_rgba(0,0,0,0.02)] h-screen flex flex-col transition-all duration-300 relative z-20 border-r border-bg-alt/50', isCollapsed ? 'w-20' : 'w-72']">

        <!-- Header / Branding -->
        <div class="p-6 flex items-center gap-4">
            <div
                class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30 shrink-0">
                W
            </div>
            <span v-if="!isCollapsed"
                class="font-poppins font-bold text-2xl text-text-main tracking-tight">Weixies</span>
        </div>

        <!-- User Profile Section -->
        <div class="px-4 mb-6" v-if="profile">
            <div
                :class="['bg-bg p-4 rounded-2xl flex items-center gap-3 border border-bg-alt/50', isCollapsed ? 'justify-center p-2' : '']">
                <!-- Profile Image -->
                <div class="relative shrink-0">
                    <div
                        class="w-10 h-10 rounded-full bg-bg-alt border-2 border-surface flex items-center justify-center overflow-hidden">
                        <img v-if="profile.profile_img" :src="profile.profile_img" alt="Profile"
                            class="w-full h-full object-cover">
                        <span v-else class="text-text-muted font-bold text-sm">{{
                            profile.full_name?.charAt(0).toUpperCase() || 'U' }}</span>
                    </div>
                    <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                </div>

                <!-- Text Info -->
                <div v-if="!isCollapsed" class="overflow-hidden">
                    <h3 class="text-sm font-semibold text-text-main truncate">{{ profile.full_name || 'User' }}</h3>
                    <p class="text-xs text-text-muted truncate">{{ profile.role || 'Member' }}</p>
                </div>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 space-y-2 overflow-y-auto">
            <router-link to="/dashboard"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-bg hover:text-primary transition-all duration-200 group"
                active-class="bg-primary/10 text-primary font-medium shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span v-if="!isCollapsed">Dashboard</span>
            </router-link>

            <router-link to="/"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-bg hover:text-primary transition-all duration-200 group">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span v-if="!isCollapsed">Home</span>
            </router-link>
        </nav>

        <!-- Footer / Logout -->
        <div class="p-4 border-t border-bg-alt/50">
            <button @click="handleLogout"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span v-if="!isCollapsed">Sign Out</span>
            </button>

            <button @click="isCollapsed = !isCollapsed"
                class="absolute -right-3 top-20 bg-surface border border-bg-alt shadow-md rounded-full p-1 text-text-muted hover:text-primary transition-colors cursor-pointer z-50">
                <svg v-if="!isCollapsed" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </aside>
</template>

<style scoped>
/* Optional: Add custom scrollbar styling if needed, otherwise standard is fine */
</style>
