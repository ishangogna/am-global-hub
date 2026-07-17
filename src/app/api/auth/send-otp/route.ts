import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase-admin'

const resend = new Resend(process.env.RESEND_API_KEY!)

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const code = generateOtp()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 min

    // Delete any existing codes for this email
    await supabaseAdmin
      .from('otp_codes')
      .delete()
      .eq('email', normalizedEmail)

    // Insert new code
    const { error: insertError } = await supabaseAdmin
      .from('otp_codes')
      .insert({ email: normalizedEmail, code, expires_at: expiresAt })

    if (insertError) {
      console.error('OTP insert error:', insertError)
      return NextResponse.json({ error: 'Failed to generate code.' }, { status: 500 })
    }

    // Send email via Resend
    const { error: emailError } = await resend.emails.send({
      from: 'AM Global Hub <onboarding@resend.dev>',
      to: normalizedEmail,
      subject: 'Your sign-in code for AM Global Hub',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 400px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="color: #0F172A; font-size: 20px; margin-bottom: 8px;">Sign in to AM Global Hub</h2>
          <p style="color: #667085; font-size: 14px; line-height: 1.5; margin-bottom: 24px;">
            Use this code to complete your sign-in. It expires in 10 minutes.
          </p>
          <div style="background: #FAF7F2; border: 1px solid #E2D9CE; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
            <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #B88A44;">${code}</span>
          </div>
          <p style="color: #667085; font-size: 12px; line-height: 1.5;">
            If you didn't request this code, you can safely ignore this email.
          </p>
        </div>
      `,
    })

    if (emailError) {
      console.error('Resend error:', emailError)
      return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Send OTP error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
