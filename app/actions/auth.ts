'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: error.message }
  }

  return { success: 'Check your email to confirm your account!' }
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  redirect('/login')
}

export async function updatePassword(currentPassword: string, newPassword: string) {
  if (typeof newPassword !== 'string' || newPassword.length < 8) {
    return { error: 'New password must be at least 8 characters long' }
  }
  if (typeof currentPassword !== 'string' || currentPassword.length === 0) {
    return { error: 'Current password is required' }
  }

  const supabase = await createClient()

  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData.user?.email) {
    return { error: 'You must be signed in to change your password' }
  }

  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email: userData.user.email,
    password: currentPassword,
  })
  if (reauthError) {
    return { error: 'Current password is incorrect' }
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) {
    console.error('updatePassword failed', { name: error.name })
    return { error: 'Could not update password. Please try again.' }
  }

  return { success: true }
}
