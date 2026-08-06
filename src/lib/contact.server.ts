const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";

export async function verifyTurnstile(token: string, ip?: string | null, useTestKey = false): Promise<boolean> {
  const secret = useTestKey ? TURNSTILE_TEST_SECRET : process.env["TURNSTILE_SECRET_KEY"];
  if (!secret) {
    // No secret configured yet — fail closed in production, allow locally.
    return process.env["NODE_ENV"] !== "production";
  }
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    console.error(`Turnstile verify failed [${res.status}]: ${await res.text()}`);
    return false;
  }
  const json = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
  if (!json.success) console.error("Turnstile rejected:", json["error-codes"]);
  return Boolean(json.success);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmail(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const resendKey = process.env["RESEND_API_KEY"];
  const to = process.env["CONTACT_TO_EMAIL"];
  const from = process.env["CONTACT_FROM_EMAIL"] ?? "Portfolio <onboarding@resend.dev>";

  if (!lovableKey || !resendKey || !to) {
    console.error("Contact email not configured (missing Resend connection or CONTACT_TO_EMAIL).");
    throw new Error("Email delivery is not configured");
  }

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#111">
      <p><strong>From:</strong> ${escapeHtml(input.name)} &lt;${escapeHtml(input.email)}&gt;</p>
      <p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
      <hr />
      <p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>
    </div>`;

  const res = await fetch(`${RESEND_GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": resendKey,
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: input.email,
      subject: `Portfolio contact: ${input.subject}`,
      html,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Resend request failed [${res.status}]: ${errorBody}`);
    throw new Error("Email delivery failed");
  }
}
