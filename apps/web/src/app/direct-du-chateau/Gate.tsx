"use client";

import { useActionState } from "react";
import { HeroVault } from "@/components/clients/direct-du-chateau/home/HeroVault";
import type { Bottle } from "@/components/clients/direct-du-chateau/home/types";
import { unlock } from "./unlock";

export function Gate({ nextPath, bottles }: { nextPath: string; bottles: Bottle[] }) {
  const [state, action, pending] = useActionState(unlock, { error: "" });

  return (
    <main id="contenu" className="ddc-gate">
      <div className="ddc-wrap ddc-hero-grid">
        <div className="ddc-hero-copy">
          <p className="ddc-kicker" translate="no">
            Direct Du Château
          </p>
          <h1 className="ddc-hero-title ddc-page-title">Prévisualisation protégée</h1>
          <p className="ddc-hero-lede">Entrez le mot de passe pour ouvrir Direct Du Château.</p>
          <form action={action} className="ddc-panel ddc-gate-form grid gap-4">
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
        </div>
        <HeroVault bottles={bottles} />
      </div>
    </main>
  );
}
