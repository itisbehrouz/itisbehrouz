import { createServerFn } from "@tanstack/react-start";
import { getRequestHost, getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { sendContactEmail, verifyTurnstile } from "./contact.server";

const TURNSTILE_TEST_HOSTS = new Set([
  "localhost",
  "85bb88d5-3025-4146-9ed5-610b6d3f829b.lovableproject.com",
]);

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  subject: z.string().trim().min(2, "Subject is required").max(200, "Subject is too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
  token: z.string().min(1).max(4096),
  honeypot: z.string().max(200).optional(),
  elapsedMs: z.number().int().nonnegative().max(1000 * 60 * 60),
});

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // Bot heuristics: hidden field must stay empty, humans take >2s to fill the form.
    if (data.honeypot) return { success: true };
    if (data.elapsedMs < 2000) throw new Error("Submission rejected");

    const ip = getRequestIP({ xForwardedFor: true });
    const hostname = getRequestHost().split(":")[0];
    const isPreview = TURNSTILE_TEST_HOSTS.has(hostname);
    const human = await verifyTurnstile(data.token, ip, isPreview);
    if (!human) throw new Error("Verification failed");

    await sendContactEmail({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });
    return { success: true };
  });
