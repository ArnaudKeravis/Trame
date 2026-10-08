"use client";

import { useActionState } from "react";
import { unlock } from "./unlock";

export function Gate({ nextPath }: { nextPath: string }) {
  const [state, action, pending] = useActionState(unlock, { error: "" });

  return (
    <main id="contenu" className="ddc-wrap ddc-section">
      <h1 className="ddc-display max-w-[16ch] text-5xl">Prévisualisation protégée</h1>
      <p className="ddc-measure mt-4">Entrez le mot de passe pour ouvrir Direct Du Château.</p>
      <form action={action} className="mt-8 grid max-w-sm gap-4">
        <input type="hidden" name="next" value={nextPath} />
        <label className="grid gap-1.5" htmlFor="password">
          Mot de passe
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            spellCheck={false}
            required
            aria-invalid={state.error ? true : undefined}
            aria-describedby={state.error ? "password-error" : undefined}
          />
        </label>
        {state.error ? (
          <p id="password-error" className="text-sm text-[var(--ddc-action)]" role="alert">
            {state.error}
          </p>
        ) : null}
        <button type="submit" className="ddc-button inline-flex justify-self-start" disabled={pending}>
          {pending ? "Vérification…" : "Entrer"}
        </button>
      </form>
    </main>
  );
}
