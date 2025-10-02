'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const supabase = await createClient()
  
  // Get the current origin (works for both dev and production)
  const origin = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : 'https://kuunnect.vercel.app'
  
  const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: {
    redirectTo: `${origin}/auth/confirm`,
  },
})

if (data.url) {
  redirect(data.url)
}
}