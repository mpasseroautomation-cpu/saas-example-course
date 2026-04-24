"use client";

import { useState } from 'react'
import { signup } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { toast } from 'sonner'

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  async function handleSignup(formData: FormData) {
    setLoading(true);
    const result = await signup(formData);
    if (result?.error) {
      toast.error(result.error);
    } else if (result?.success) {
      toast.success(result.success);
    }
    setLoading(false);
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden font-sans flex items-center justify-center p-4">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none flex items-center justify-center">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full max-w-5xl h-auto object-cover opacity-80"
        >
          <source src="/bg-animation.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,black_100%)] opacity-80" />
      </div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Create an account</h1>
          <p className="text-zinc-400 text-sm">Sign up to start requesting premium content.</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-white focus:ring-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-300">Password</Label>
            <Input id="password" name="password" type="password" required className="bg-white/5 border-white/10 text-white focus:border-white focus:ring-white" />
          </div>
          <div className="pt-4">
            <Button formAction={handleSignup} disabled={loading} className="w-full bg-white text-black hover:bg-zinc-200 font-semibold rounded-full py-6">
              {loading ? 'Processing...' : 'Sign Up'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <Link href="/login" className="text-white hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </div>
      
      <Link href="/" className="absolute top-8 left-8 z-10 text-zinc-400 hover:text-white text-sm flex items-center gap-2 transition-colors">
        &larr; Back to home
      </Link>
    </div>
  )
}
