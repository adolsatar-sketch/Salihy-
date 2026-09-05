"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { t } from "@/lib/utils";
import { programs } from "@/data/programs";
import { buildWhatsappLink, WHATSAPP_ENABLED, INSTAGRAM_URL } from "@/data/site";
import { ExternalButtonLink } from "@/components/ui/Button";

const inputField =
  "w-full bg-obsidian border border-bone/15 px-4 py-3 text-sm text-bone focus:outline-none focus:border-active [&>option]:bg-obsidian";

type FormState = {
  name: string;
  age: string;
  gender: string;
  phone: string;
  program: string;
  level: string;
  preferredTime: string;
  notes: string;
  guardianConsent: boolean;
};

const initialState: FormState = {
  name: "",
  age: "",
  gender: "",
  phone: "",
  program: "",
  level: "",
  preferredTime: "",
  notes: "",
  guardianConsent: false,
};

export function RegistrationForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isMinor = form.age !== "" && Number(form.age) < 18 && Number(form.age) > 0;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.age || !form.gender || !form.phone || !form.program) {
      setError(dict.common.required);
      return;
    }
    if (isMinor && !form.guardianConsent) {
      setError(
        locale === "ar"
          ? "موافقة ولي الأمر مطلوبة لتسجيل القاصرين."
          : "Guardian consent is required to register a minor."
      );
      return;
    }

    const programLabel = programs.find((p) => p.slug === form.program);
    const lines =
      locale === "ar"
        ? [
            "طلب تسجيل جديد — أكاديمية صالحي",
            `الاسم: ${form.name}`,
            `العمر: ${form.age}`,
            `الجنس: ${form.gender}`,
            `رقم الهاتف: ${form.phone}`,
            `البرنامج: ${programLabel ? t(locale, programLabel.title) : form.program}`,
            form.level && `المستوى: ${form.level}`,
            form.preferredTime && `الوقت المفضل: ${form.preferredTime}`,
            form.notes && `ملاحظات: ${form.notes}`,
            isMinor && `موافقة ولي الأمر: نعم`,
          ]
        : [
            "New registration request — Salihy Academy",
            `Name: ${form.name}`,
            `Age: ${form.age}`,
            `Gender: ${form.gender}`,
            `Phone: ${form.phone}`,
            `Program: ${programLabel ? t(locale, programLabel.title) : form.program}`,
            form.level && `Level: ${form.level}`,
            form.preferredTime && `Preferred time: ${form.preferredTime}`,
            form.notes && `Notes: ${form.notes}`,
            isMinor && `Guardian consent: yes`,
          ];

    const message = lines.filter(Boolean).join("\n");
    setSubmitted(message);
  }

  if (submitted) {
    return (
      <div className="border border-active/40 bg-charcoal p-8 text-center sm:p-12">
        <p className="font-heading text-2xl text-bone">{dict.common.formSuccessTitle}</p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-steel">{dict.common.formSuccessBody}</p>
        <pre className="mx-auto mt-6 max-w-md whitespace-pre-wrap rounded bg-obsidian p-4 text-start text-xs text-steel">
          {submitted}
        </pre>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {WHATSAPP_ENABLED ? (
            <ExternalButtonLink href={buildWhatsappLink(submitted)} target="_blank" rel="noopener noreferrer" variant="primary">
              {dict.common.sendWhatsapp}
            </ExternalButtonLink>
          ) : (
            <ExternalButtonLink href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" variant="primary">
              {locale === "ar" ? "تواصل عبر إنستغرام" : "Contact via Instagram"}
            </ExternalButtonLink>
          )}
          <button
            type="button"
            onClick={() => {
              setSubmitted(null);
              setForm(initialState);
            }}
            className="text-xs tracking-wide text-steel underline-offset-4 hover:text-bone hover:underline"
          >
            {locale === "ar" ? "تسجيل آخر" : "Submit another"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={locale === "ar" ? "الاسم الكامل" : "Full Name"} required>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputField}
            type="text"
          />
        </Field>
        <Field label={locale === "ar" ? "العمر" : "Age"} required>
          <input
            required
            value={form.age}
            onChange={(e) => update("age", e.target.value)}
            className={inputField}
            type="number"
            min={4}
            max={80}
          />
        </Field>
        <Field label={locale === "ar" ? "الجنس" : "Gender"} required>
          <select required value={form.gender} onChange={(e) => update("gender", e.target.value)} className={inputField}>
            <option value="" disabled>
              {locale === "ar" ? "اختر" : "Select"}
            </option>
            <option value={locale === "ar" ? "ذكر" : "Male"}>{locale === "ar" ? "ذكر" : "Male"}</option>
            <option value={locale === "ar" ? "أنثى" : "Female"}>{locale === "ar" ? "أنثى" : "Female"}</option>
          </select>
        </Field>
        <Field label={locale === "ar" ? "رقم الهاتف" : "Phone Number"} required>
          <input
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputField}
            type="tel"
          />
        </Field>
        <Field label={locale === "ar" ? "البرنامج المطلوب" : "Requested Program"} required>
          <select required value={form.program} onChange={(e) => update("program", e.target.value)} className={inputField}>
            <option value="" disabled>
              {locale === "ar" ? "اختر برنامجًا" : "Choose a program"}
            </option>
            {programs
              .filter((p) => !p.isInformational)
              .map((p) => (
                <option key={p.slug} value={p.slug}>
                  {t(locale, p.title)}
                </option>
              ))}
          </select>
        </Field>
        <Field label={locale === "ar" ? "مستوى الخبرة" : "Experience Level"}>
          <select value={form.level} onChange={(e) => update("level", e.target.value)} className={inputField}>
            <option value="">{locale === "ar" ? "غير محدد" : "Not specified"}</option>
            <option value={locale === "ar" ? "مبتدئ" : "Beginner"}>{locale === "ar" ? "مبتدئ" : "Beginner"}</option>
            <option value={locale === "ar" ? "متوسط" : "Intermediate"}>{locale === "ar" ? "متوسط" : "Intermediate"}</option>
            <option value={locale === "ar" ? "متقدم" : "Advanced"}>{locale === "ar" ? "متقدم" : "Advanced"}</option>
          </select>
        </Field>
        <Field label={locale === "ar" ? "الوقت المفضل" : "Preferred Time"}>
          <input
            value={form.preferredTime}
            onChange={(e) => update("preferredTime", e.target.value)}
            className={inputField}
            type="text"
            placeholder={locale === "ar" ? "مثال: مساءً" : "e.g. Evening"}
          />
        </Field>
      </div>

      <Field label={locale === "ar" ? "ملاحظات" : "Notes"}>
        <textarea
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          className={`${inputField} min-h-24`}
          rows={4}
        />
      </Field>

      {isMinor && (
        <label className="flex items-start gap-3 text-sm text-steel">
          <input
            type="checkbox"
            checked={form.guardianConsent}
            onChange={(e) => update("guardianConsent", e.target.checked)}
            className="mt-1 h-4 w-4 accent-active"
          />
          {locale === "ar"
            ? "أؤكد بصفتي ولي أمر موافقتي على تسجيل القاصر في برنامج الأكاديمية."
            : "As the guardian, I confirm my consent to register this minor in the academy's program."}
        </label>
      )}

      {error && <p className="text-sm text-active">{error}</p>}

      <button type="submit" className="group relative inline-flex items-center justify-center bg-active px-8 py-4 text-sm tracking-wide text-bone transition-colors hover:bg-blood">
        {dict.common.register}
      </button>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block text-sm text-steel">
      <span className="mb-2 block text-xs uppercase tracking-[0.15em]">
        {label} {required && <span className="text-active">*</span>}
      </span>
      {children}
    </label>
  );
}
