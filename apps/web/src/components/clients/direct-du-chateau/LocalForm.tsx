"use client";

import { FormEvent, useState } from "react";

const autoComplete: Record<string, string> = {
  prenom: "given-name",
  nom: "family-name",
  societe: "organization",
  email: "email",
  telephone: "tel",
  message: "off",
  siret: "off",
  sujet: "off",
  activite: "off",
};

export function LocalForm({
  fields,
  submitLabel,
  confirmationTitle,
  confirmationText,
}: {
  fields: Array<{
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    help?: string;
    options?: string[];
  }>;
  submitLabel: string;
  confirmationTitle: string;
  confirmationText: string;
}) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [missingName, setMissingName] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const missing = fields.find((field) => field.required && !String(data.get(field.name) ?? "").trim());
    if (missing) {
      const message = `Indiquez ${missing.label.toLocaleLowerCase("fr")} pour continuer.`;
      setError(message);
      setMissingName(missing.name);
      setTimeout(() => document.getElementById(missing.name)?.focus(), 0);
      return;
    }
    setError("");
    setMissingName("");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="ddc-panel" role="status">
        <h3 className="ddc-display text-4xl">{confirmationTitle}</h3>
        <p className="mt-4 max-w-[65ch] leading-relaxed">{confirmationText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="ddc-panel grid gap-4" noValidate>
      {fields.map((field) => {
        const invalid = missingName === field.name;
        const describedBy = [field.help ? `${field.name}-help` : "", invalid ? `${field.name}-error` : ""]
          .filter(Boolean)
          .join(" ");
        return (
          <label key={field.name} className="grid gap-1.5" htmlFor={field.name}>
            <span>
              {field.label}
              {field.required ? <span aria-hidden="true"> *</span> : null}
            </span>
            {field.help ? (
              <span id={`${field.name}-help`} className="text-sm text-[var(--ddc-muted)]">
                {field.help}
              </span>
            ) : null}
            {field.options ? (
              <select
                id={field.name}
                name={field.name}
                required={field.required}
                defaultValue=""
                autoComplete={autoComplete[field.name] ?? "off"}
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy || undefined}
              >
                <option value="">Choisir…</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                required={field.required}
                rows={5}
                autoComplete={autoComplete[field.name] ?? "off"}
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy || undefined}
              />
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type ?? "text"}
                inputMode={field.type === "tel" ? "tel" : field.type === "email" ? "email" : undefined}
                required={field.required}
                spellCheck={field.name === "email" || field.name === "siret" ? false : undefined}
                autoComplete={autoComplete[field.name] ?? "off"}
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy || undefined}
              />
            )}
            {invalid ? (
              <span id={`${field.name}-error`} className="text-sm text-[var(--ddc-action)]" role="alert">
                {error}
              </span>
            ) : null}
          </label>
        );
      })}
      <button type="submit" className="ddc-button inline-flex justify-self-start">
        {submitLabel}
      </button>
      <p className="text-sm text-[var(--ddc-muted)]">Les champs marqués * sont nécessaires. Aucun mot de passe n’est demandé.</p>
    </form>
  );
}
