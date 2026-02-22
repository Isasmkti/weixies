import { supabase } from "../lib/supabase";

export async function getCoba() {
    try {
        const { data, error } = await supabase
            .from('coba')
            .select('*')

        if (!data) {
            return { err: error }
        }

        return { data }

    } catch (error) {
        return { error }
    }

}