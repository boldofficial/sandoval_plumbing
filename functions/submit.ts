interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  description: string;
  preferredContact: string;
  zip: string;
  honeypot?: string;
}

interface CloudflareEnv {
  CLOUDFLARE_ACCOUNT_ID?: string;
  CLOUDFLARE_API_TOKEN?: string;
  CLOUDFLARE_FROM_EMAIL?: string;
  CLOUDFLARE_TO_EMAIL?: string;
}

export async function onRequestPost(context: {
  request: Request;
  env: CloudflareEnv;
}): Promise<Response> {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const data: FormData = await context.request.json();

    // Honeypot check — if filled, silently reject (bot detected)
    if (data.honeypot) {
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    // Validate env config
    const accountId = context.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = context.env.CLOUDFLARE_API_TOKEN;
    if (!accountId || !apiToken) {
      console.error('Cloudflare email env vars not configured');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers,
      });
    }

    const serviceLabels: Record<string, string> = {
      emergency: 'Emergency Plumbing',
      'drain-cleaning': 'Drain Cleaning',
      'water-heater': 'Water Heater Repair / Installation',
      'leak-detection': 'Leak Detection & Repair',
      'sewer-line': 'Sewer Line Services',
      other: 'Other Service',
    };

    const serviceLabel = serviceLabels[data.service] || data.service;

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a5f;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 140px;">Name</td>
            <td style="padding: 8px 12px; color: #374151; border-bottom: 1px solid #e5e7eb;">${escapeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Phone</td>
            <td style="padding: 8px 12px; color: #374151; border-bottom: 1px solid #e5e7eb;">
              <a href="tel:${escapeHtml(data.phone)}" style="color: #b91c1c;">${escapeHtml(data.phone)}</a>
            </td>
          </tr>
          ${
            data.email
              ? `
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Email</td>
            <td style="padding: 8px 12px; color: #374151; border-bottom: 1px solid #e5e7eb;">
              <a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb;">${escapeHtml(data.email)}</a>
            </td>
          </tr>`
              : ''
          }
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Service</td>
            <td style="padding: 8px 12px; color: #374151; border-bottom: 1px solid #e5e7eb;">${escapeHtml(serviceLabel)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">ZIP Code</td>
            <td style="padding: 8px 12px; color: #374151; border-bottom: 1px solid #e5e7eb;">${escapeHtml(data.zip)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Contact Method</td>
            <td style="padding: 8px 12px; color: #374151; border-bottom: 1px solid #e5e7eb; text-transform: capitalize;">${escapeHtml(data.preferredContact)}</td>
          </tr>
        </table>
        ${
          data.description
            ? `
        <div style="margin-top: 16px;">
          <h3 style="color: #374151; font-size: 14px; margin-bottom: 4px;">Description</h3>
          <p style="color: #4b5563; background: #f9fafb; padding: 12px; border-radius: 6px; line-height: 1.5;">${escapeHtml(data.description)}</p>
        </div>`
            : ''
        }
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin-top: 24px;" />
        <p style="color: #6b7280; font-size: 12px;">Sent from sandovalplumbingchicago.com contact form</p>
      </div>
    `;

    const fromEmail = context.env.CLOUDFLARE_FROM_EMAIL || 'contact@sandovalplumbingchicago.com';
    const toEmail = context.env.CLOUDFLARE_TO_EMAIL || 'eddie@sandovalplumbingchicago.com';

    const cfResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: toEmail,
          from: fromEmail,
          subject: `New Contact Form Submission from ${data.name}`,
          html: emailHtml,
          text: [
            `New Contact Form Submission`,
            ``,
            `Name: ${data.name}`,
            `Phone: ${data.phone}`,
            data.email ? `Email: ${data.email}` : '',
            `Service: ${serviceLabel}`,
            `ZIP: ${data.zip}`,
            `Preferred Contact: ${data.preferredContact}`,
            data.description ? `\nDescription:\n${data.description}` : '',
          ]
            .filter(Boolean)
            .join('\n'),
        }),
      },
    );

    const cfResult: {
      success: boolean;
      errors?: Array<{ message: string }>;
    } = await cfResponse.json();

    if (!cfResponse.ok || !cfResult.success) {
      console.error('Cloudflare Email API error:', cfResponse.status, cfResult);
      return new Response(
        JSON.stringify({
          error: cfResult.errors?.[0]?.message || 'Failed to send email notification',
        }),
        { status: 500, headers },
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers });
  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers,
    });
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
