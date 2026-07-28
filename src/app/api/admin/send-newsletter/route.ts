import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    // Verify admin session
    const adminCookie = req.cookies.get('admin_session')?.value
    if (adminCookie !== 'am-global-hub-admin-authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { pdfUrl, subject, message } = await req.json()

    if (!pdfUrl) {
      return NextResponse.json({ error: 'PDF URL is required.' }, { status: 400 })
    }

    // Fetch all subscribed customers
    const { data: subscribers, error: subError } = await supabaseAdmin
      .from('customers')
      .select('email, first_name')
      .eq('subscribed_newsletter', true)
      .not('email', 'is', null)

    if (subError) {
      console.error('Fetch subscribers error:', subError)
      return NextResponse.json({ error: 'Failed to fetch subscribers.' }, { status: 500 })
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ error: 'No subscribers found.' }, { status: 400 })
    }

    // Download the PDF from Supabase Storage
    const pdfResponse = await fetch(pdfUrl)
    if (!pdfResponse.ok) {
      return NextResponse.json({ error: 'Failed to download PDF.' }, { status: 500 })
    }
    const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer())
    const pdfFilename = pdfUrl.split('/').pop() || 'catalogue.pdf'

    // Send emails in batches of 10 to avoid rate limits
    const emailSubject = subject || 'New Catalogue from AM Global Hub'
    const emailMessage = message || 'Hi! Here\'s our latest product catalogue. Take a look at our newest offerings.'

    let sent = 0
    let failed = 0
    const batchSize = 10

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize)

      const results = await Promise.allSettled(
        batch.map((sub) =>
          resend.emails.send({
            from: 'AM Global Hub <noreply@amglobalhub.com>',
            to: sub.email,
            subject: emailSubject,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
                <h2 style="color: #0F172A; font-size: 20px; margin-bottom: 8px;">
                  ${sub.first_name ? `Hi ${sub.first_name}!` : 'Hi!'}
                </h2>
                <p style="color: #667085; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
                  ${emailMessage}
                </p>
                <p style="color: #667085; font-size: 14px; line-height: 1.6;">
                  The catalogue is attached as a PDF. Feel free to reach out on WhatsApp if anything catches your eye!
                </p>
                <div style="margin-top: 24px; padding: 16px; background: #FAF7F2; border-radius: 12px; border: 1px solid #E2D9CE;">
                  <p style="color: #B88A44; font-size: 13px; font-weight: 600; margin: 0 0 4px 0;">AM Global Hub</p>
                  <p style="color: #667085; font-size: 12px; margin: 0;">Premium Corporate Gifting · New Delhi</p>
                  <p style="color: #667085; font-size: 12px; margin: 4px 0 0 0;">WhatsApp: +91 8368772989</p>
                </div>
                <p style="color: #999; font-size: 11px; margin-top: 24px;">
                  You're receiving this because you subscribed to AM Global Hub newsletters. You can unsubscribe from your account settings.
                </p>
              </div>
            `,
            attachments: [
              {
                filename: pdfFilename,
                content: pdfBuffer,
              },
            ],
          })
        )
      )

      results.forEach((r) => {
        if (r.status === 'fulfilled') sent++
        else failed++
      })

      // Small delay between batches
      if (i + batchSize < subscribers.length) {
        await new Promise((r) => setTimeout(r, 500))
      }
    }

    // Log the send
    await supabaseAdmin.from('newsletter_logs').insert([{
      pdf_url: pdfUrl,
      subject: emailSubject,
      subscribers_count: subscribers.length,
      sent_count: sent,
      failed_count: failed,
    }])

    return NextResponse.json({
      ok: true,
      sent,
      failed,
      total: subscribers.length,
    })
  } catch (err) {
    console.error('Send newsletter error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
