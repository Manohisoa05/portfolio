"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Github,
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { profile } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  /* Validation des champs avec messages d'erreur clairs */
  const validate = (): boolean => {
    const next: Errors = {};
    if (form.name.trim().length < 2)
      next.name = "Veuillez indiquer votre nom (2 caractères minimum).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Veuillez saisir une adresse e-mail valide.";
    if (form.phone && !/^[+\d\s().-]{7,20}$/.test(form.phone))
      next.phone = "Ce numéro de téléphone ne semble pas valide.";
    if (form.subject.trim().length < 3)
      next.subject = "Veuillez préciser le sujet de votre message.";
    if (form.message.trim().length < 10)
      next.message = "Votre message doit contenir au moins 10 caractères.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    /* 
     * Envoi par défaut via mailto (aucun serveur requis).
     * Pour un vrai envoi, branchez ici Formspree, Resend,
     * EmailJS ou une route API Next.js.
     */
    const body = encodeURIComponent(
      `Nom : ${form.name}\nE-mail : ${form.email}\nTéléphone : ${form.phone || "—"}\n\n${form.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${body}`;

    setTimeout(() => {
      setStatus("sent");
      setForm(initialForm);
      setTimeout(() => setStatus("idle"), 4000);
    }, 900);
  };

  const field = (name: keyof FormState) => ({
    value: form[name],
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm((f) => ({ ...f, [name]: e.target.value }));
      if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
    },
    "aria-invalid": !!errors[name],
    className: cn(
      "w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all",
      errors[name]
        ? "border-red-400/60 focus:border-red-400"
        : "border-white/10 focus:border-electric focus:shadow-glow"
    ),
  });

  const socials = [
    { href: profile.socials.github, icon: Github, label: "GitHub" },
    { href: profile.socials.email, icon: Mail, label: "E-mail" },
    { href: profile.socials.whatsapp, icon: MessageCircle, label: "WhatsApp" },
  ];

  return (
    <section id="contact" className="section-padding relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Travaillons ensemble"
          description="Vous avez un projet, une idée ou une application à améliorer ? Discutons-en et transformons votre besoin en une solution concrète."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Coordonnées + réseaux */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="glass glow-border flex flex-col gap-6 p-8"
          >
            <h3 className="font-display text-xl font-semibold text-white">
              Mes coordonnées
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-slate-300">
                <span className="glass flex h-10 w-10 items-center justify-center rounded-xl text-electric">
                  <Mail size={17} />
                </span>
                <a href={`mailto:${profile.email}`} className="hover:text-neon">
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <span className="glass flex h-10 w-10 items-center justify-center rounded-xl text-pulse">
                  <Phone size={17} />
                </span>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:text-neon">
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <span className="glass flex h-10 w-10 items-center justify-center rounded-xl text-neon">
                  <MapPin size={17} />
                </span>
                {profile.location}
              </li>
            </ul>

            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                Retrouvez-moi sur
              </p>
              <div className="flex gap-3">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="glass glass-hover flex h-11 w-11 items-center justify-center rounded-xl text-slate-300"
                  >
                    <Icon size={19} />
                  </a>
                ))}
              </div>
            </div>

           
          </motion.div>

          {/* Formulaire */}
          <motion.form
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            noValidate
            className="glass glow-border space-y-5 p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm text-slate-300">
                  Nom *
                </label>
                <input id="name" type="text" placeholder="Votre nom" {...field("name")} />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm text-slate-300">
                  Adresse e-mail *
                </label>
                <input id="email" type="email" placeholder="vous@exemple.com" {...field("email")} />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm text-slate-300">
                  Téléphone
                </label>
                <input id="phone" type="tel" placeholder="+261 34 00 000 00" {...field("phone")} />
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>
                )}
              </div>
              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm text-slate-300">
                  Sujet *
                </label>
                <input id="subject" type="text" placeholder="Sujet du message" {...field("subject")} />
                {errors.subject && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.subject}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-slate-300">
                Message *
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Parlez-moi de votre projet…"
                {...field("message")}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={status !== "idle"}
              whileHover={status === "idle" ? { scale: 1.02 } : {}}
              whileTap={status === "idle" ? { scale: 0.97 } : {}}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-medium text-white transition-all sm:w-auto",
                status === "sent"
                  ? "bg-emerald-500/20 border border-emerald-400/50 text-emerald-300"
                  : "bg-gradient-to-r from-electric to-pulse shadow-glow hover:shadow-glow-lg"
              )}
            >
              {status === "idle" && (
                <>
                  Envoyer le message <Send size={17} />
                </>
              )}
              {status === "sending" && (
                <>
                  Envoi en cours… <Loader2 size={17} className="animate-spin" />
                </>
              )}
              {status === "sent" && (
                <>
                  Message prêt à être envoyé <CheckCircle2 size={17} />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
