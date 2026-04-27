# Prénom/Nom séparés + Certificat nominatif — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stocker prénom et nom séparément à l'inscription et afficher automatiquement le nom complet sur le certificat (sans saisie manuelle).

**Architecture:** Ajouter `first_name` + `last_name` dans la table `profiles` Supabase. Mettre à jour le formulaire d'inscription (2 champs), l'action `signup`, et le `CertificateGenerator` qui charge le nom depuis le profil au lieu d'un input manuel.

**Tech Stack:** Next.js 16 App Router, Supabase (auth + PostgreSQL), React 19, TypeScript

---

## Fichiers touchés

| Fichier | Action |
|--------|--------|
| `src/app/register/RegisterForm.tsx` | Modifier — 2 champs Prénom + Nom |
| `src/app/actions/auth.ts` | Modifier — signup stocke first_name + last_name |
| `src/components/certificate/CertificateGenerator.tsx` | Modifier — supprime input, charge depuis profil |

**Migration Supabase (hors code) :** exécuter le SQL dans le dashboard Supabase.

---

## Task 1 : Migration Supabase — ajouter first_name + last_name

**Files:**
- Aucun fichier à modifier — SQL à exécuter dans le dashboard Supabase

- [ ] **Step 1 : Exécuter ce SQL dans Supabase Dashboard → SQL Editor**

```sql
-- Ajouter les colonnes
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS first_name TEXT,
  ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Peupler depuis full_name pour les utilisateurs existants
-- (split sur le premier espace : "Jean Dupont" → first="Jean", last="Dupont")
UPDATE profiles
SET
  first_name = TRIM(SPLIT_PART(full_name, ' ', 1)),
  last_name   = TRIM(SUBSTRING(full_name FROM POSITION(' ' IN full_name) + 1))
WHERE full_name IS NOT NULL
  AND full_name != ''
  AND first_name IS NULL;
```

- [ ] **Step 2 : Vérifier dans Supabase → Table Editor → profiles**

Confirmer que les colonnes `first_name` et `last_name` apparaissent et que les utilisateurs existants ont leurs valeurs renseignées.

---

## Task 2 : Formulaire d'inscription — 2 champs séparés

**Files:**
- Modify: `src/app/register/RegisterForm.tsx`

- [ ] **Step 1 : Remplacer le state prefilledName par prefilledFirstName + prefilledLastName**

Remplacer dans `RegisterForm.tsx` :

```tsx
const [prefilledEmail, setPrefilledEmail] = useState("");
const [prefilledFirstName, setPrefilledFirstName] = useState("");
const [prefilledLastName, setPrefilledLastName] = useState("");
```

- [ ] **Step 2 : Mettre à jour le useEffect qui récupère les données Stripe**

```tsx
useEffect(() => {
  async function fetchSession() {
    if (sessionId) {
      try {
        const res = await fetch(`/api/checkout/session?session_id=${sessionId}`);
        const data = await res.json();
        if (data.email) setPrefilledEmail(data.email);
        if (data.name) {
          const parts = (data.name as string).trim().split(/\s+/);
          setPrefilledFirstName(parts[0] ?? "");
          setPrefilledLastName(parts.slice(1).join(" ") ?? "");
        }
      } catch (err) {
        console.error("Erreur récupération session Stripe:", err);
      }
    }
  }
  fetchSession();
}, [sessionId]);
```

- [ ] **Step 3 : Remplacer le champ "Nom complet" par 2 champs Prénom + Nom**

Remplacer le bloc `<div>` du champ `full_name` par :

```tsx
<div className="grid grid-cols-2 gap-3">
  <div>
    <label htmlFor="first_name" className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white">
      <User className="h-4 w-4 text-brand-gold" aria-hidden />
      Prénom
    </label>
    <input
      id="first_name"
      name="first_name"
      type="text"
      autoComplete="given-name"
      required
      defaultValue={prefilledFirstName}
      key={`first-${prefilledFirstName}`}
      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-zinc-500 focus:border-brand-gold/50 focus:outline-none focus:ring-4 focus:ring-brand-gold/10 transition-all"
      placeholder="Jean"
    />
  </div>
  <div>
    <label htmlFor="last_name" className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white">
      <User className="h-4 w-4 text-brand-gold" aria-hidden />
      Nom
    </label>
    <input
      id="last_name"
      name="last_name"
      type="text"
      autoComplete="family-name"
      required
      defaultValue={prefilledLastName}
      key={`last-${prefilledLastName}`}
      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-zinc-500 focus:border-brand-gold/50 focus:outline-none focus:ring-4 focus:ring-brand-gold/10 transition-all"
      placeholder="Dupont"
    />
  </div>
</div>
```

- [ ] **Step 4 : Supprimer l'import `prefilledName` (devenu inutile)**

Vérifier qu'il n'y a plus de référence à `prefilledName` dans le fichier.

- [ ] **Step 5 : Commit**

```bash
git add lms/src/app/register/RegisterForm.tsx
git commit -m "feat: split registration form into separate first_name + last_name fields"
```

---

## Task 3 : Action signup — stocker first_name + last_name

**Files:**
- Modify: `src/app/actions/auth.ts`

- [ ] **Step 1 : Mettre à jour la fonction signup pour lire les 2 nouveaux champs**

Remplacer dans `auth.ts` la fonction `signup` :

```typescript
export async function signup(formData: FormData) {
  const supabase = await createClient();
  const next = getValidNext(formData.get("next"));
  const email = formData.get("email") as string;
  const firstName = (formData.get("first_name") as string).trim();
  const lastName = (formData.get("last_name") as string).trim();
  const fullName = `${firstName} ${lastName}`;

  const data = {
    email,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: fullName,
        first_name: firstName,
        last_name: lastName,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://app.monpassformation.com"}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  };

  const { data: authData, error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/register?error=" + encodeURIComponent(error.message));
  }

  if (authData.user) {
    // Lien Stripe
    await supabase
      .from("user_subscriptions")
      .update({ user_id: authData.user.id })
      .eq("email", email);

    // Upsert profil avec prénom + nom
    await supabase
      .from("profiles")
      .upsert({
        id: authData.user.id,
        full_name: fullName,
        first_name: firstName,
        last_name: lastName,
      }, { onConflict: "id" });
  }

  revalidatePath("/", "layout");

  const message = next.includes("session_id")
    ? "Compte créé ! Confirmez votre email pour accéder à votre formation."
    : "Vérifiez votre email pour confirmer votre compte.";

  redirect(`/login?next=${encodeURIComponent(next)}&message=${encodeURIComponent(message)}`);
}
```

- [ ] **Step 2 : Commit**

```bash
git add lms/src/app/actions/auth.ts
git commit -m "feat: store first_name and last_name in profiles on signup"
```

---

## Task 4 : CertificateGenerator — nom automatique depuis le profil

**Files:**
- Modify: `src/components/certificate/CertificateGenerator.tsx`

- [ ] **Step 1 : Ajouter le chargement du nom depuis profiles dans le useEffect**

Dans le `useEffect` existant, après `supabase.auth.getUser()`, ajouter :

```typescript
if (user) {
  // ... code existant pour progressRows et gameRow ...

  // Charger le nom depuis profiles
  const { data: profileRow } = await supabase
    .from("profiles")
    .select("first_name, last_name, full_name")
    .eq("id", user.id)
    .single();

  if (profileRow) {
    const firstName = profileRow.first_name ?? "";
    const lastName = profileRow.last_name ?? "";
    const fullName = firstName && lastName
      ? `${firstName} ${lastName}`
      : (profileRow.full_name ?? "");
    setName(fullName);
  }
}
```

- [ ] **Step 2 : Supprimer le champ input manuel du nom**

Remplacer le bloc `<div className="flex flex-col gap-4 sm:flex-row">` (qui contient l'input texte et le bouton) par :

```tsx
<div className="flex flex-col gap-4 sm:flex-row">
  <div className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
    {name || "Chargement du nom…"}
  </div>
  <button
    onClick={generateCertificate}
    disabled={!name.trim()}
    className="rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-navy shadow transition hover:bg-[var(--brand-gold-hover)] disabled:opacity-50"
  >
    Générer le certificat
  </button>
</div>
```

- [ ] **Step 3 : Vérifier que le state `name` est encore utilisé dans generateCertificate**

La fonction `generateCertificate` utilise `name.trim()` à la ligne `if (!canvasRef.current || !name.trim()) return;` — ne pas supprimer ce check, il est toujours valide.

- [ ] **Step 4 : Commit**

```bash
git add lms/src/components/certificate/CertificateGenerator.tsx
git commit -m "feat: auto-fill certificate name from profile, remove manual input"
```

---

## Task 5 : Push et vérification en prod

- [ ] **Step 1 : Push**

```bash
git push
```

- [ ] **Step 2 : Attendre le déploiement Vercel (~1-2 min)**

- [ ] **Step 3 : Tester le parcours complet**

1. Aller sur `https://app.monpassformation.com/register`
2. Vérifier que 2 champs Prénom + Nom apparaissent
3. Créer un compte de test → vérifier dans Supabase → `profiles` que `first_name` et `last_name` sont renseignés
4. Aller sur `https://app.monpassformation.com/formation/profil` → section certificat
5. Vérifier que le nom s'affiche automatiquement (non modifiable)
6. Générer le certificat → vérifier que le nom apparaît correctement

- [ ] **Step 4 : Vérifier les utilisateurs existants dans Supabase**

Dans Supabase → SQL Editor :
```sql
SELECT id, full_name, first_name, last_name FROM profiles LIMIT 20;
```
Confirmer que les anciens utilisateurs ont `first_name` et `last_name` renseignés depuis la migration Task 1.
