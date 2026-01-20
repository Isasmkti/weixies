<template>
    <div>
        <h1>Sign Up</h1>
        <form @submit.prevent="handleSignUp">
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <input type="text" v-model="fullName" placeholder="Full Name" required />
            <button type="submit">Sign Up</button>
        </form>
        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { supabase } from '../lib/supabase';  // Path to your supabase.js file

export default {
    name: 'SignUp',
    setup() {
        const email = ref('');
        const password = ref('');
        const fullName = ref('');
        const error = ref('');

        const handleSignUp = async () => {
            try {
                // 1. Sign up the user with email and password
                const { user, error: signUpError } = await supabase.auth.signUp({
                    email: email.value,
                    password: password.value,
                });

                // 2. Handle the sign-up error
                if (signUpError) {
                    error.value = signUpError.message;
                    return;
                }

                // Ensure that user exists and has an id before proceeding
                if (!user || !user.id) {
                    throw new Error('User creation failed. User ID is missing.');
                }

                // 3. After user is created, insert the profile into `profiles` table
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: user.id,               // Link the profile to the user by ID
                            full_name: fullName.value,  // Use the full name entered by the user
                            role: 'user',               // Set the default role
                            profile_img: null,          // Set profile image as null initially
                        }
                    ]);

                console.log("User ID:", user.id); // Memastikan user.id ada

                if (profileError) {
                    error.value = profileError.message;
                    return;
                }

                // 4. Redirect to login page or dashboard after successful sign-up
                console.log('User and profile created successfully', user);
                this.$router.push('/login');
            } catch (err) {
                error.value = err.message;
                console.error('Error during sign-up:', err);
            }
        };

        return {
            email,
            password,
            fullName,
            error,
            handleSignUp,
        };
    },
};
</script>

<style scoped>
/* Add your styles here */
</style>
