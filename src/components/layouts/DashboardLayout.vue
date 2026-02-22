<script setup>
import Sidebar from '../Sidebar.vue';
import AdminSidebar from '../admin/AdminSidebar.vue';
import { useAuth } from '../../composables/useAuth';
import Footer from '../Footer.vue';

const { profile } = useAuth()
</script>

<template>
    <div class="flex h-screen bg-bg font-poppins text-text-main overflow-hidden">
        <!-- Sidebar -->
        <component :is="profile?.role === 'admin' ? AdminSidebar : Sidebar" />

        <!-- Main Area -->
        <div class="flex flex-col flex-1 min-h-screen">
            <!-- Content & Footer Scroll Area -->
            <main class="flex-1 overflow-y-auto bg-bg relative flex flex-col">
                <div class="p-4 md:p-8 flex-grow">
                    <slot />
                </div>

                <!-- Footer integrated into scroll flow -->
                <Footer />
            </main>
        </div>
    </div>
</template>
