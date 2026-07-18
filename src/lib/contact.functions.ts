import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  subject: z.string().trim().min(2, "Subject is required").max(200, "Subject is too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // TODO: wire up an email provider (e.g. Resend, SendGrid, AWS SES) to deliver the message.
    // For now, the submission is validated and can be logged or stored.
    console.log("Contact form submission:", data);
    return { success: true };
  });
