<script setup>
import Sidebar from '../Sidebar.vue';
import AdminSidebar from '../admin/AdminSidebar.vue';
import { useAuth } from '../../composables/useAuth';

const { profile } = useAuth()
</script>

<template>
    <div class="flex h-screen bg-bg font-poppins text-text-main overflow-hidden">
        <div v-if="profile?.role === 'admin'">
            <!-- Sidebar -->
            <AdminSidebar />
        </div>
        <div v-if="profile?.role !== 'admin'">
            <!-- Sidebar -->
            <Sidebar />
        </div>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto bg-bg relative">
            <div class="p-8">
                <slot></slot> <!-- Dynamic Content -->
            </div>
        </main>
    </div>
</template>
