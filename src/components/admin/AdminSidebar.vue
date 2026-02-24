<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'

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
        :class="['bg-surface shadow-[4px_0_24px_rgba(0,0,0,0.02)] h-screen flex flex-col transition-all duration-300 relative z-20 border-r border-bg-alt/50 ', isCollapsed ? 'w-20' : 'w-72']">

        <!-- Header / Branding -->
        <div class="p-6 flex items-center gap-4">
            <div
                class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30 shrink-0">
                A
            </div>
            <transition name="fade">
                <span v-if="!isCollapsed"
                    class="font-poppins font-bold text-2xl text-text-main tracking-tight">Admin</span>
            </transition>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 space-y-2 overflow-y-auto container no-scrollbar">
            <!-- Dashboard -->
            <router-link to="/admin"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-bg hover:text-primary transition-all duration-200 group"
                active-class="bg-primary/10 text-primary font-medium shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <transition name="fade">
                    <span v-if="!isCollapsed">Dashboard</span>
                </transition>
            </router-link>

            <!-- Products -->
            <router-link to="/admin/products"
                :class="['flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-bg hover:text-primary transition-all duration-200 group', isCollapsed ? 'justify-center' : '']"
                active-class="bg-primary/10 text-primary font-medium shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <transition name="fade">
                    <span v-if="!isCollapsed">Products</span>
                </transition>
            </router-link>

            <!-- Profile -->
            <router-link to="/dashboard"
                :class="['flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-bg hover:text-primary transition-all duration-200 group', isCollapsed ? 'justify-center' : '']"
                active-class="bg-primary/10 text-primary font-medium shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.387 0 4.634.6 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zM12 22a10 10 0 110-20 10 10 0 010 20z" />
                </svg>
                <transition name="fade">
                    <span v-if="!isCollapsed">Profile</span>
                </transition>
            </router-link>

            <!-- Back to Shop -->
            <router-link to="/"
                :class="['flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-bg hover:text-primary transition-all duration-200 group', isCollapsed ? 'justify-center' : '']">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <transition name="fade">
                    <span v-if="!isCollapsed">Back to Shop</span>
                </transition>
            </router-link>
        </nav>

        <!-- Footer / Logout -->
        <div class="p-4 border-t border-bg-alt/50 flex flex-col gap-2 relative">
            <!-- User Profile Section -->
            <div v-if="profile"
                :class="['p-3 rounded-xl flex items-center gap-3 transition-all duration-300', isCollapsed ? 'justify-center p-2' : 'bg-bg border border-bg-alt/50']">
                <!-- Profile Image -->
                <div class="relative shrink-0">
                    <div
                        class="w-10 h-10 rounded-full bg-bg-alt border-2 border-surface flex items-center justify-center overflow-hidden">
                        <img v-if="profile.profile_img" :src="profile.profile_img" alt="Profile"
                            class="w-full h-full object-cover">
                        <span v-else class="text-text-muted font-bold text-sm">{{
                            profile.full_name?.charAt(0).toUpperCase() || 'A' }}</span>
                    </div>
                    <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-surface">
                    </div>
                </div>

                <!-- Text Info -->
                <transition name="fade">
                    <div v-if="!isCollapsed" class="overflow-hidden min-w-0 flex-1">
                        <h3 class="text-sm font-semibold text-text-main truncate">{{ profile.full_name || 'Admin' }}
                        </h3>
                        <p class="text-xs text-text-muted truncate">{{ profile.role || 'Administrator' }}</p>
                    </div>
                </transition>
            </div>

            <!-- Sign Out -->
            <button @click="handleLogout"
                :class="['flex items-center gap-3 px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 group', isCollapsed ? 'justify-center' : 'w-full']">
                <svg xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 shrink-0 group-hover:scale-110 transition-transform duration-200" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <transition name="fade">
                    <span v-if="!isCollapsed" class="font-medium">Sign Out</span>
                </transition>
            </button>

            <!-- Collapse Toggle -->
            <button @click="isCollapsed = !isCollapsed"
                class="absolute -right-3 top-0 transform -translate-y-1/2 bg-surface border border-bg-alt shadow-md rounded-full p-1.5 text-text-muted hover:text-primary transition-colors cursor-pointer z-50">
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
/* Smooth transition for text appearing/disappearing */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.no-scrollbar {
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE & Edge lama */
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari */
}

/* Ensure whitespace doesn't wrap awkwardly during transition */
span,
h3,
p {
    white-space: nowrap;
}
</style>
