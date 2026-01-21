import { ref } from 'vue'
import { supabase } from '../lib/supabase'

const user = ref(null)
const profile = ref(null)
const loading = ref(false)

export function useAuth() {

  const signUp = async (email, password, fullName) => {
    loading.value = true

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    })

    loading.value = false
    if (error) throw error

    return data
  }

  const signIn = async (email, password) => {
    loading.value = true

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    loading.value = false
    if (error) throw error

    user.value = data.user
    await fetchProfile()

    return data
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    user.value = null
    profile.value = null
  }

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, role, profile_img')
      .single()

    if (error) throw error
    profile.value = data
  }

  const updateProfile = async (payload) => {
    const { error } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', user.value.id)

    if (error) throw error
    await fetchProfile()
  }

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    fetchProfile,
    updateProfile
  }
}
