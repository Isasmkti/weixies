<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
            <input type="email" v-model="email" placeholder="Email" required />
            <div class="password-wrapper">
                <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" required />
                <button type="button" @click="showPassword = !showPassword">
                    {{ showPassword ? 'Hide' : 'Show' }}
                </button>
            </div>
            <button type="submit">Login</button>
        </form>
        <router-link to="/signup">Sign Up</router-link>
        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signUp } from '../services/authService';

export default {
    name: 'Login',
    setup() {
        const router = useRouter();
        const email = ref('');
        const password = ref('');
        const showPassword = ref(false);
        const error = ref('');

        const handleLogin = async () => {
            try {
                const { user, error: loginError } = await signUp(email.value, password.value);
                if (loginError) {
                    error.value = loginError.message;
                } else {
                    router.push('/dashboard');
                }
            } catch (err) {
                error.value = "An unexpected error occurred.";
                console.error(err);
            }
        };

        return { email, password, showPassword, error, handleLogin };
    },
};
</script>

<style scoped>
.password-wrapper {
    display: flex;
    align-items: center;
}

.password-wrapper input {
    flex: 1;
}

.password-wrapper button {
    margin-left: 5px;
}
</style>
