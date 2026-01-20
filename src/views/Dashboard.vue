<template>
    <div>
        <h1>Welcome to Your Dashboard</h1>
        <p>Here are your profile details.</p>
        <!-- Add more profile-related data here -->
        <button @click="handleSignOut">Log Out</button>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getUser, signOut } from '../services/authService';

export default {
    name: 'Dashboard',
    setup() {
        const router = useRouter(); // Initialize router
        const user = ref(null);

        const handleSignOut = async () => {
            await signOut();
            router.push('/login');
        };

        onMounted(() => {
            user.value = getUser();
            if (!user.value) {
                router.push('/login'); // Redirect to login if not authenticated
            }
        });

        return { user, handleSignOut };
    },
};
</script>

<style scoped>
/* Add your styles here */
</style>
