<script setup>
import Sidebar from '../Sidebar.vue';
</script>

<template>
    <div class="flex h-screen bg-bg overflow-hidden font-poppins">
        <!-- Sidebar -->
        <Sidebar />

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto bg-bg relative">
            <div class="p-8">
                <slot></slot> <!-- Dynamic Content -->
            </div>
        </main>
    </div>
</template>
