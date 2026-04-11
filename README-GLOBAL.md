# 🏠 FORMATION IMMOBILIÈRE COMPLÈTE - 42 HEURES
## Certification Agent Immobilier - 5 Modules

---

## ✍️ Créer ou enrichir le contenu

- **Guide opérationnel (outils, checklist, chaîne LMS)** : [`guide-creer-contenu.md`](guide-creer-contenu.md)
- **Gabarit nouvelle leçon** : [`templates/TEMPLATE-LECON-SCRIPT.md`](templates/TEMPLATE-LECON-SCRIPT.md)
- **Validation des chemins** : `node scripts/validate-course-content.mjs` (voir [`scripts/README.md`](scripts/README.md))

## 📋 PRÉSENTATION

Cette formation complète de **42 heures** de contenu pédagogique (5 × 8 h + 2 h ouverture/clôture) couvre l'ensemble des compétences nécessaires pour exercer la profession d'agent immobilier en conformité avec la législation 2026. Les **évaluations** (10 h au total) peuvent être proposées en option ou en parcours allongé — voir `AVATARS-CASTING-ET-PACKAGING-COMMERCIAL.md` pour le détail des volumes.

### 🎯 Objectifs
- Maîtriser le cadre juridique ALUR et la conformité
- Acquérir les techniques de transaction et négociation
- Comprendre le financement et la fiscalité immobilière
- Déployer une stratégie marketing digital efficace
- Conduire des visites et clore les ventes comme un professionnel

---

## 📁 STRUCTURE DES DOSSIERS

```
formation-immobiliere/
├── 📁 plan-pedagogique/
│   ├── PLAN_PEDAGOGIQUE_GLOBAL.md      # Plan global 42h
│   ├── module1-plan-pedagogique.md     # Module 1 Juridique (8h+2h)
│   ├── module2-plan-pedagogique.md     # Module 2 Transaction (8h+2h)
│   ├── module3-plan-pedagogique.md     # Module 3 Financement (8h+2h)
│   ├── module4-plan-pedagogique.md     # Module 4 Marketing (8h+2h)
│   └── module5-plan-pedagogique.md     # Module 5 Terrain (8h+2h)
│
├── 📁 module1-juridique/
│   ├── 📁 scripts/                     # 5 scripts vidéo HeyGen/Synthesia
│   │   ├── 01-loi-alur-2026.md
│   │   ├── 02-compromis-vente.md
│   │   ├── 03-diagnostics-immobiliers.md
│   │   ├── 04-mandats-strategie.md
│   │   ├── 05-copropriete-location.md
│   │   └── README.md
│   ├── 📁 presentations/
│   │   └── module1-presentation.md     # 12 slides PowerPoint
│   ├── 📁 templates/                   # Fiches .md + TABLEAU_MANDATS_COMPARATIF.xlsx (généré)
│   │   ├── FICHE_DIAGNOSTICS_IMMOBILIERS.md
│   │   ├── MANDAT_VENTE_EXCLUSIF.md
│   │   ├── GRILLE_CHECKLIST_JURIDIQUE.md
│   │   ├── TABLEAU_MANDATS_COMPARATIF.xlsx
│   │   └── README.md
│   ├── 📁 qcm/
│   │   └── module1-qcm.md              # 10 QCM avec explications
│   └── 📁 visuels/                     # Prompts Midjourney + Storyboards
│       ├── 01-prompts-midjourney.md
│       ├── 02-storyboards-videos.md
│       ├── 03-voix-elevenlabs.md
│       └── README.md
│
├── 📁 module2-transaction/
│   ├── 📁 scripts/                     # 5 scripts vidéo
│   │   ├── 01-estimation-immobiliere.md
│   │   ├── 02-prospection-scripts.md
│   │   ├── 03-negociation-mandat.md
│   │   ├── 04-techniques-negociation-avancees.md
│   │   ├── 05-crm-fidelisation.md
│   │   └── README.md
│   ├── 📁 presentations/
│   │   └── module2-presentation.md     # 12 slides
│   ├── 📁 templates/                   # .md + .xlsx (générés)
│   │   ├── GRILLE_ESTIMATION_COMPARATIVE.xlsx
│   │   ├── FICHE_PROSPECTION_TELEPHONIQUE.md
│   │   ├── GRILLE_NEGOCIATION.md
│   │   ├── TEMPLATE_SUIVI_CLIENT.xlsx
│   │   └── README.md
│   ├── 📁 qcm/
│   │   └── module2-qcm.md              # 10 QCM
│   └── 📁 visuels/
│       ├── MODULE2_PROMPTS_MIDJOURNEY.md
│       ├── MODULE2_STORYBOARDS.md
│       ├── MODULE2_VOIX_ELEVENLABS.md
│       └── README.md
│
├── 📁 module3-financement/
│   ├── 📁 scripts/                     # 5 scripts vidéo
│   │   ├── script01-credit-immobilier-2026.md
│   │   ├── script02-fiscalite-immobiliere.md
│   │   ├── script03-calcul-rentabilite.md
│   │   ├── script04-dispositifs-fiscaux.md
│   │   ├── script05-assurances-immobilieres.md
│   │   └── README.md
│   ├── 📁 presentations/
│   │   └── module3-presentation.md     # 12 slides
│   ├── 📁 templates/                   # .md + .xlsx (générés)
│   │   ├── SIMULATEUR_CREDIT.xlsx
│   │   ├── TABLEAU_FISCALITE.xlsx
│   │   ├── CALCUL_RENTABILITE.xlsx
│   │   ├── FICHE_ASSURANCES.md
│   │   └── README.md
│   ├── 📁 qcm/
│   │   └── module3-qcm.md              # 10 QCM
│   └── 📁 visuels/
│       ├── 01-prompts-midjourney.md
│       ├── 02-storyboard-credit.md
│       ├── 03-storyboard-fiscalite.md
│       ├── 04-storyboard-rentabilite.md
│       ├── 05-storyboard-dispositifs.md
│       ├── 06-storyboard-assurances.md
│       ├── 07-recommandations-voix.md
│       └── README.md
│
├── 📁 module4-marketing/
│   ├── 📁 scripts/                     # 5 scripts vidéo
│   │   ├── 01-photos-immobilieres-secrets-pros.md
│   │   ├── 02-rediger-annonces-qui-vendent.md
│   │   ├── 03-maitriser-seloger-leboncoin.md
│   │   ├── 04-reseaux-sociaux-strategie-2026.md
│   │   ├── 05-seo-immobilier-google.md
│   │   └── README.md
│   ├── 📁 presentations/
│   │   └── module4-presentation.md     # 12 slides
│   ├── 📁 templates/                   # .md + .xlsx (générés)
│   │   ├── TEMPLATE_ANNONCE_OPTIMISEE.md
│   │   ├── CALENDRIER_EDITORIAL_RESEAUX.xlsx
│   │   ├── FICHE_TECHNIQUE_PHOTO.md
│   │   ├── TABLEAU_PERFORMANCE_KPIs.xlsx
│   │   └── README.md
│   ├── 📁 qcm/
│   │   └── module4-qcm.md              # 10 QCM
│   └── 📁 visuels/
│       ├── MODULE4-VISUELS-IA-COMPLET.md
│       ├── PROMPTS-MIDJOURNEY.txt
│       └── README.md
│
├── 📁 module5-terrain/
│   ├── 📁 scripts/                     # 5 scripts vidéo
│   │   ├── 01-conduire-visite-pro.md
│   │   ├── 02-argumentaire-convertit.md
│   │   ├── 03-techniques-closing-avancees.md
│   │   ├── 04-promesse-acte-authentique.md
│   │   ├── 05-fidelisation-recommandation.md
│   │   └── README.md
│   ├── 📁 presentations/
│   │   └── module5-presentation.md     # 12 slides
│   ├── 📁 templates/                   # 4 templates
│   │   ├── FICHE_VISITE_COMPLETE.md
│   │   ├── GUIDE_OBJECTION_HANDLING.md
│   │   ├── CHECKLIST_CLOSING.md
│   │   ├── FICHE_POST_VENTE.md
│   │   └── README.md
│   ├── 📁 qcm/
│   │   └── module5-qcm.md              # 10 QCM
│   └── 📁 visuels/
│       ├── module5-prompts-midjourney.md
│       ├── module5-storyboards.md
│       ├── module5-voices-elevenlabs.md
│       └── README.md
│
├── 📁 guide-eleve/
│   └── guide-eleve-complet.md          # Guide 30 pages
│
├── 📁 evaluation/                     # 5 cas pratiques d'évaluation
├── 📁 certification/                  # Modèle d'attestation
├── 📁 marketing/                      # Page de vente
├── 📁 videos/                         # Script intro globale 42 h
├── 📁 scripts/
│   ├── generate_excel_templates.py   # Génère les 8 fichiers .xlsx
│   └── README.md
├── requirements.txt
├── INVENTAIRE-LIVRABLES.md
├── AVATARS-CASTING-ET-PACKAGING-COMMERCIAL.md
│
└── 📁 lms/                            # Application Next.js (LMS en ligne)
    ├── README.md                     # Installation, .env, déploiement
    ├── src/                          # Parcours, login, API session
    └── package.json
```

---

## 📊 RÉCAPITULATIF DES LIVRABLES

| Type de livrable | Quantité | Détails |
|------------------|----------|---------|
| **Plans pédagogiques** | 6 | 1 global + 5 par module |
| **Scripts vidéo** | 25 | 5 par module (8-10 min chacun) |
| **Présentations** | 5 | 12 slides par module |
| **Templates pratiques** | 20+ | Excel `.xlsx` (8) générés par script + équivalents Word en `.md` |
| **Cas pratiques évaluation** | 5 | Dossier `evaluation/` |
| **Attestation / vente / intro vidéo** | 3 | `certification/`, `marketing/`, `videos/` |
| **QCM** | 50 | 10 par module avec explications |
| **Prompts Midjourney** | 25+ | Visuels pour les 25 vidéos |
| **Storyboards** | 25 | Détaillés avec B-roll |
| **Voix ElevenLabs** | 15+ | Recommandations par vidéo |
| **Guide de l'élève** | 1 | 30 pages synthétiques |

---

## 🎨 SPÉCIFICATIONS VISUELLES

### Palette de couleurs
- **Bleu marine** : #1a3a5c (corporate, confiance)
- **Or/Doré** : #d4af37 (premium, excellence)
- **Blanc** : #ffffff (clarté, professionnalisme)

### Identité visuelle
- Style corporate immobilier premium
- Icônes professionnelles (Font Awesome)
- Photographies haute qualité (prompts Midjourney fournis)

---

## 🎙️ PRODUCTION VIDÉO (HeyGen/Synthesia)

### Casting avatars & packaging commercial
Un document dédié définit les **5 animateurs virtuels** (un par module), les prompts visuels et les **offres Starter / Pro / Academy** : voir `AVATARS-CASTING-ET-PACKAGING-COMMERCIAL.md`.

### Scripts prêts à l'emploi
- 25 scripts complets (8-10 minutes chacun)
- Durée totale : ~4h de contenu vidéo
- Indications B-roll détaillées
- Pauses pour le rythme
- Prompts Midjourney pour les visuels

### Voix recommandées (ElevenLabs)
- Voix masculine professionnelle (juridique, technique)
- Voix féminine chaleureuse (marketing, relationnel)
- Paramètres de stabilité et clarté précisés

---

## ⚖️ CONFORMITÉ JURIDIQUE 2026

Tous les contenus respectent :
- ✅ Loi ALUR 2014 et évolutions 2025-2026
- ✅ Loi Hoguet 1970 (carte professionnelle)
- ✅ Code de la construction et de l'habitation
- ✅ Code civil (compromis, vente)
- ✅ RGPD (protection des données)
- ✅ Décrets récents (DPE, diagnostics)

---

## 🚀 UTILISATION

### Pour les formateurs
1. Consulter le `PLAN_PEDAGOGIQUE_GLOBAL.md`
2. Utiliser les présentations par module
3. Distribuer les templates aux participants
4. Organiser les évaluations (QCM + cas pratiques)

### Pour générer les fichiers Excel
1. `pip install -r requirements.txt`
2. `python3 scripts/generate_excel_templates.py`
3. Ouvrir les `.xlsx` dans `module*/templates/`

### Pour la production vidéo
1. Sélectionner les scripts dans chaque `module*/scripts/`
2. Générer les visuels avec les prompts Midjourney
3. Enregistrer les voix sur ElevenLabs
4. Monter sur HeyGen/Synthesia selon les storyboards

### Pour les participants
1. Suivre la formation selon le plan pédagogique
2. Utiliser le `guide-eleve-complet.md` comme support
3. Pratiquer avec les templates fournis
4. Passer les QCM d'évaluation

---

## 📞 CONTACTS ET RESSOURCES

### Outils recommandés
- **Vidéo IA** : HeyGen, Synthesia
- **Voix IA** : ElevenLabs
- **Visuels IA** : Midjourney V6
- **Présentations** : PowerPoint, Gamma, Canva
- **Templates** : Microsoft Word, Excel

### Ressources juridiques
- Légifrance (codes et lois)
- DGCCRF (conformité)
- CNIL (RGPD)
- FNAIM (déontologie)

---

## 📝 LICENCE ET UTILISATION

Cette formation est prête à l'emploi pour :
- Centres de formation immobiliers
- Agences immobilières (formation interne)
- Auto-entrepreneurs (reconversion)
- Organismes de formation certifiants

**Tous les contenus sont fournis en l'état, prêts à être utilisés ou adaptés.**

---

## ✅ CHECKLIST DE DÉPLOIEMENT

- [ ] Lire le PLAN_PEDAGOGIQUE_GLOBAL.md
- [ ] Vérifier la conformité juridique avec votre expert
- [ ] Adapter les templates avec votre logo
- [ ] Préparer le matériel de formation
- [ ] Tester les QCM
- [ ] Produire les vidéos (si option e-learning)
- [ ] Imprimer le Guide de l'élève
- [ ] Organiser les sessions d'évaluation

---

**Formation créée avec soin pour une montée en compétence optimale des agents immobiliers.** 🏠🎓
