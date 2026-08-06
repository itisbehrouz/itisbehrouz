import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLang } from "@/hooks/use-lang";
import { ui } from "@/lib/i18n";
import { submitContact } from "@/lib/contact.functions";

// Cloudflare's always-passing test key is used until a real site key is configured.
const SITE_KEY = (import.meta.env["VITE_TURNSTILE_SITE_KEY"] as string | undefined) ?? "1x00000000000000000000AA";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
  }
}

function Turnstile({ onToken, theme }: { onToken: (token: string) => void; theme: "light" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let widgetId: string | undefined;
    let cancelled = false;

    const render = () => {
      if (cancelled || !ref.current || !window.turnstile) return;
      widgetId = window.turnstile.render(ref.current, {
        sitekey: SITE_KEY,
        theme,
        callback: (token: string) => onToken(token),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      });
    };

    if (window.turnstile) {
      render();
    } else {
      const existing = document.querySelector<HTMLScriptElement>("script[data-turnstile]");
      if (existing) {
        existing.addEventListener("load", render);
      } else {
        const s = document.createElement("script");
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
        s.async = true;
        s.defer = true;
        s.dataset["turnstile"] = "true";
        s.addEventListener("load", render);
        document.head.appendChild(s);
      }
    }

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [onToken, theme]);

  return <div ref={ref} className="min-h-[65px]" />;
}

const inputCls =
  "w-full bg-transparent border border-border focus:border-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors";
const labelCls = "text-xs uppercase tracking-widest text-muted-foreground";
const mono = { fontFamily: "var(--font-mono)" } as const;

export function ContactDialog({ theme }: { theme: "light" | "dark" }) {
  const { lang } = useLang();
  const t = ui[lang];
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [token, setToken] = useState("");
  const openedAt = useRef<number>(Date.now());

  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().trim().min(2, t.errors.nameReq).max(100, t.errors.nameLong),
        email: z.string().trim().email(t.errors.emailInv).max(255, t.errors.emailLong),
        subject: z.string().trim().min(2, t.errors.subjectReq).max(200, t.errors.subjectLong),
        message: z.string().trim().min(10, t.errors.messageMin).max(2000, t.errors.messageMax),
        honeypot: z.string().max(0).optional(),
      }),
    ),
    defaultValues: { name: "", email: "", subject: "", message: "", honeypot: "" },
  });

  const errors = form.formState.errors;

  const onSubmit = form.handleSubmit(async (values) => {
    if (!token) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      await submitContact({
        data: {
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
          honeypot: values.honeypot ?? "",
          token,
          elapsedMs: Date.now() - openedAt.current,
        },
      });
      form.reset();
      setToken("");
      setStatus("idle");
      setOpen(false);
      toast.success(t.contact.received, { description: t.contact.thanks });
    } catch {
      setStatus("error");
    }
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          openedAt.current = Date.now();
          setStatus("idle");
        }
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center text-xs uppercase tracking-[0.2em] px-6 py-3 border border-foreground bg-foreground text-background hover:bg-foreground/90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          style={mono}
        >
          {t.contact.openForm}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-none border-border bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-normal" style={{ fontFamily: "var(--font-display)" }}>
            {t.contact.dialogTitle}
          </DialogTitle>
          <DialogDescription>{t.contact.dialogDesc}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-5" aria-label={t.contact.ariaForm}>
          <div className="space-y-2">
            <label htmlFor="cd-name" className={labelCls} style={mono}>{t.contact.name}</label>
            <input id="cd-name" type="text" {...form.register("name")} className={inputCls} placeholder={t.contact.namePh} aria-invalid={!!errors.name} />
            {errors.name && <p className="text-xs text-destructive-foreground" style={mono}>{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="cd-email" className={labelCls} style={mono}>{t.contact.email}</label>
            <input id="cd-email" type="email" {...form.register("email")} className={inputCls} placeholder={t.contact.emailPh} aria-invalid={!!errors.email} />
            {errors.email && <p className="text-xs text-destructive-foreground" style={mono}>{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="cd-subject" className={labelCls} style={mono}>{t.contact.subject}</label>
            <input id="cd-subject" type="text" {...form.register("subject")} className={inputCls} placeholder={t.contact.subjectPh} aria-invalid={!!errors.subject} />
            {errors.subject && <p className="text-xs text-destructive-foreground" style={mono}>{errors.subject.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="cd-message" className={labelCls} style={mono}>{t.contact.message}</label>
            <textarea id="cd-message" rows={5} {...form.register("message")} className={`${inputCls} resize-none`} placeholder={t.contact.messagePh} aria-invalid={!!errors.message} />
            {errors.message && <p className="text-xs text-destructive-foreground" style={mono}>{errors.message.message}</p>}
          </div>
          {/* Honeypot — hidden from humans, tempting for bots */}
          <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
            <label htmlFor="cd-company">Company</label>
            <input id="cd-company" type="text" tabIndex={-1} autoComplete="off" {...form.register("honeypot")} />
          </div>
          <Turnstile onToken={setToken} theme={theme} />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center text-xs uppercase tracking-[0.2em] px-6 py-3 border border-foreground bg-foreground text-background hover:bg-foreground/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              style={mono}
            >
              {status === "submitting" ? t.contact.submitting : t.contact.submit}
            </button>
            {status === "error" && (
              <p className="text-sm text-destructive-foreground" role="alert">
                {token ? t.contact.errorMsg : t.contact.verifyMsg}
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
