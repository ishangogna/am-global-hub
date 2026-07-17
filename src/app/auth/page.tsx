'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Mail, ArrowRight, Loader2, CheckCircle2, ChevronLeft } from 'lucide-react'
import { createAuthClient } from '@/lib/supabase-auth'

type Step = 'email' | 'otp' | 'profile'

const inputCls =
  'w-full rounded-xl border border-black/10 bg-[#FAF7F2] px-4 py-3 text-sm outline-none transition focus:border-[#B88A44] focus:ring-2 focus:ring-[#B88A44]/20'

export default function AuthPage() {
  const router = useRouter()
  const supabase = createAuthClient()

  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userId, setUserId] = useState<string | null>(null)

  // ── Step 1: send OTP via our API ──────────────────────────────────────────
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'Failed to send code.')
      return
    }

    setStep('otp')
  }

  // ── Step 2: verify OTP via our API ────────────────────────────────────────
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code: otp }),
    })

    const data = await res.json()

    if (!res.ok) {
      setLoading(false)
      setError(data.error || 'Verification failed.')
      return
    }

    setUserId(data.userId)

    // Establish session on client using the token hash (verifyOtp with token_hash)
    if (data.tokenHash) {
      const { error: sessionError } = await supabase.auth.verifyOtp({
        type: 'magiclink',
        token_hash: data.tokenHash,
      })

      if (sessionError) {
        console.error('Session establish error:', sessionError)
        // Session failed but user is verified — still proceed
      }
    }

    setLoading(false)

    if (data.isNewUser) {
      setStep('profile')
    } else {
      router.push('/account')
      router.refresh()
    }
  }

  // ── Step 3: save profile ──────────────────────────────────────────────────
  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Insert customer record using the anon client (RLS allows own user_id)
    const { error: insertError } = await supabase.from('customers').insert([{
      user_id: userId,
      email: email.toLowerCase().trim(),
      first_name: firstName.trim() || null,
      last_name: lastName.trim() || null,
      phone: phone.trim() || null,
      subscribed_newsletter: true,
    }])

    setLoading(false)

    if (insertError) {
      console.error('Customer insert error:', insertError)
      setError(insertError.message || 'Failed to save profile.')
      return
    }

    router.push('/account')
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/images/logo.png"
            alt="AM Global Hub"
            width={140}
            height={40}
            className="mix-blend-multiply"
          />
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">

          {/* ── STEP: EMAIL ── */}
          {step === 'email' && (
            <>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#B88A44]/10">
                <Mail className="h-5 w-5 text-[#B88A44]" />
              </div>
              <h1 className="text-2xl font-semibold text-[#0F172A]">Sign in or Sign up</h1>
              <p className="mt-1.5 text-sm text-[#667085]">
                Enter your email and we'll send you a one-time code. No password needed.
              </p>

              <form onSubmit={handleSendOtp} className="mt-7 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@company.com"
                    autoComplete="email"
                    className={inputCls}
                  />
                </div>
                {error && (
                  <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#B88A44] py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                >
                  {loading
                    ? <><Loader2 className="h-4 w-4 animate-spin" />Sending code…</>
                    : <><ArrowRight className="h-4 w-4" />Continue with Email</>
                  }
                </button>
              </form>
            </>
          )}

          {/* ── STEP: OTP ── */}
          {step === 'otp' && (
            <>
              <button
                onClick={() => { setStep('email'); setOtp(''); setError('') }}
                className="mb-5 flex items-center gap-1 text-xs text-[#667085] transition hover:text-[#B88A44]"
              >
                <ChevronLeft className="h-3 w-3" /> Back
              </button>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#B88A44]/10">
                <Mail className="h-5 w-5 text-[#B88A44]" />
              </div>
              <h1 className="text-2xl font-semibold text-[#0F172A]">Check your email</h1>
              <p className="mt-1.5 text-sm text-[#667085]">
                We sent a 6-digit code to <span className="font-medium text-[#0F172A]">{email}</span>.
                Enter it below.
              </p>

              <form onSubmit={handleVerifyOtp} className="mt-7 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">
                    One-time code
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    required
                    placeholder="123456"
                    autoComplete="one-time-code"
                    className={`${inputCls} text-center text-2xl font-bold tracking-[0.5em]`}
                  />
                </div>
                {error && (
                  <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#B88A44] py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                >
                  {loading
                    ? <><Loader2 className="h-4 w-4 animate-spin" />Verifying…</>
                    : <><CheckCircle2 className="h-4 w-4" />Verify Code</>
                  }
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp as any}
                  className="w-full text-center text-xs text-[#667085] transition hover:text-[#B88A44]"
                >
                  Didn't receive it? Resend code
                </button>
              </form>
            </>
          )}

          {/* ── STEP: PROFILE (new users only) ── */}
          {step === 'profile' && (
            <>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#B88A44]/10">
                <CheckCircle2 className="h-5 w-5 text-[#B88A44]" />
              </div>
              <h1 className="text-2xl font-semibold text-[#0F172A]">Almost there!</h1>
              <p className="mt-1.5 text-sm text-[#667085]">
                Tell us a bit about yourself so we can personalise your experience.
              </p>

              <form onSubmit={handleSaveProfile} className="mt-7 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">
                      First Name <span className="text-[#B88A44]">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      placeholder="Jane"
                      autoComplete="given-name"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      autoComplete="family-name"
                      className={inputCls}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#0F172A]">
                    Phone Number <span className="text-[#667085]">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    className={inputCls}
                  />
                </div>
                {error && (
                  <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading || !firstName.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#B88A44] py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                >
                  {loading
                    ? <><Loader2 className="h-4 w-4 animate-spin" />Saving…</>
                    : 'Complete Sign Up'
                  }
                </button>
              </form>

              <p className="mt-5 text-center text-xs text-[#667085]">
                By signing up you agree to receive occasional newsletters from AM Global Hub.
                Unsubscribe anytime.
              </p>
            </>
          )}

        </div>

        <p className="mt-6 text-center text-xs text-[#667085]">
          We respect your privacy. Your details are never shared with third parties.
        </p>
      </div>
    </div>
  )
}
