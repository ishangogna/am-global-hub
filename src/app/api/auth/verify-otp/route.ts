import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json()

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required.' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Look up the OTP
    const { data: otpRow, error: fetchError } = await supabaseAdmin
      .from('otp_codes')
      .select('*')
      .eq('email', normalizedEmail)
      .eq('code', code)
      .single()

    if (fetchError || !otpRow) {
      return NextResponse.json({ error: 'Invalid code. Please try again.' }, { status: 401 })
    }

    // Check expiry
    if (new Date(otpRow.expires_at) < new Date()) {
      await supabaseAdmin.from('otp_codes').delete().eq('id', otpRow.id)
      return NextResponse.json({ error: 'Code has expired. Please request a new one.' }, { status: 401 })
    }

    // Delete used code
    await supabaseAdmin.from('otp_codes').delete().eq('id', otpRow.id)

    // Check if user already exists
    const { data: { users } } = await supabaseAdmin.auth.admin.listUsers()
    const existingUser = users?.find(
      (u) => u.email?.toLowerCase() === normalizedEmail
    )

    let userId: string

    if (existingUser) {
      userId = existingUser.id
    } else {
      // Create user with confirmed email
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: normalizedEmail,
        email_confirm: true,
      })
      if (createError || !newUser.user) {
        console.error('Create user error:', createError)
        return NextResponse.json({ error: 'Failed to create account.' }, { status: 500 })
      }
      userId = newUser.user.id
    }

    // Generate a magic link for this user (to establish session on client)
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: normalizedEmail,
    })

    if (linkError || !linkData) {
      console.error('Generate link error:', linkError)
      return NextResponse.json({ error: 'Failed to create session.' }, { status: 500 })
    }

    // Check if customer record exists
    const { data: customer } = await supabaseAdmin
      .from('customers')
      .select('id')
      .eq('user_id', userId)
      .single()

    // Extract the token_hash from the link properties
    const tokenHash = linkData.properties?.hashed_token

    return NextResponse.json({
      ok: true,
      userId,
      isNewUser: !customer,
      tokenHash,
    })
  } catch (err) {
    console.error('Verify OTP error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
