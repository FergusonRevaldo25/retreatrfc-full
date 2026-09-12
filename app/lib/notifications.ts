import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// If you get a custom domain later, update this to that domain instead.
const LOGO_URL = "https://retreatrfc-full.vercel.app/retreatlogo.jpg";

function wrapEmailTemplate(title: string, bodyHtml: string) {
  return `
  <div style="background-color:#0a0a0a; padding:32px 16px; font-family:Arial, sans-serif;">
    <table role="presentation" width="100%" style="max-width:520px; margin:0 auto; background-color:#ffffff; border-radius:8px; overflow:hidden;">
      <tr>
        <td style="background-color:#7c3aed; padding:24px; text-align:center;">
          <img src="${LOGO_URL}" alt="Retreat RFC" width="64" height="64" style="border-radius:50%; display:block; margin:0 auto 8px;" />
          <div style="color:#ffffff; font-size:20px; font-weight:bold; letter-spacing:1px;">
            RETREAT RFC
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:32px; color:#111111;">
          <h2 style="color:#7c3aed; margin-top:0;">${title}</h2>
          ${bodyHtml}
        </td>
      </tr>
      <tr>
        <td style="background-color:#0a0a0a; padding:16px; text-align:center; color:#999999; font-size:12px;">
          © ${new Date().getFullYear()} Retreat RFC. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
  `;
}

export async function sendEmailNotification(subject: string, bodyHtml: string) {
  try {
    await resend.emails.send({
      from: "Retreat RFC <onboarding@resend.dev>",
      to: "revaldo.ferguson01@gmail.com",
      subject,
      html: wrapEmailTemplate(subject, bodyHtml),
    });
  } catch (error) {
    // Don't let a failed email crash the form submission —
    // the data is already saved in the database either way.
    console.error("Failed to send email notification:", error);
  }
}
