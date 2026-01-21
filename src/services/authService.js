import { supabase } from "../lib/supabase";
import { handleSupabaseError } from "../utils/errorHandler";
// Sign up a new user
export const signUp = async (email, password, metadata = {}) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata,
            },
        });

        if (error) throw error;

        return { user: data.user, error: null };
    } catch (error) {
        return { user: null, error: handleSupabaseError(error) };
    }
};



// Sign out the current user
export const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    } catch (error) {
        console.error("Error signing out:", handleSupabaseError(error));
    }
};

// Get the current authenticated user
export const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user;
};

// Listen for authentication state changes
export const onAuthStateChanged = (callback) => {
    supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });
};
