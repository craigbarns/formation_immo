#!/usr/bin/env node
/**
 * Script complet: Génère l'avatar Marie avec voix XTTS
 * Usage: node scripts/generate-marie-intro.mjs
 */

import { writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// Configuration
const MARIE_CONFIG = {
  name: "Marie",
  role: "Coach pédagogique immobilier",
  avatar: "👩‍🏫",
  color: "#c9a227",
  
  // Scripts pour différents modules
  intros: {
    welcome: `Bonjour et bienvenue dans votre formation immobilière de 42 heures. Je suis Marie, votre coach pédagogique. Ensemble, nous allons explorer tous les aspects essentiels du métier d'agent immobilier, du juridique à la transaction, en passant par le financement et le marketing. Cette formation est conforme à la réglementation ALUR et vous préparera efficacement à votre examen. Commençons dès maintenant !`,
    
    juridique: `Bienvenue dans le module juridique. Ici, nous allons découvrir les fondamentaux légaux qui encadrent notre profession. Le mandat de vente, le compromis, les diagnostics obligatoires, la copropriété... Tous ces concepts seront désormais clairs pour vous. Je vous accompagne pas à pas.`,
    
    transaction: `Dans ce module transaction, nous allons passer à la pratique. Comment estimer un bien ? Comment rédiger une annonce percutante ? Comment négocier avec un acheteur ? Comment mener une visite efficace ? Je vais vous révéler toutes les techniques des meilleurs agents immobiliers.`,
    
    financement: `Le financement immobilier est souvent le point de blocage des transactions. Pas d'inquiétude ! Dans ce module, nous allons maîtriser les concepts de taux d'endettement, les différents types de prêts, les dispositifs fiscaux comme le Pinel ou le PTZ. Vous pourrez ainsi conseiller vos clients avec expertise.`,
    
    marketing: `Le marketing immobilier, c'est l'art de faire venir les clients à vous. Sites d'annonces, réseaux sociaux, prospection, farming... Nous allons créer ensemble votre stratégie digitale pour dépasser la concurrence et développer votre portefeuille.`,
    
    terrain: `Dernière ligne droite avec le module terrain ! Ici, nous mettons en pratique tout ce que vous avez appris. Visites, négociations, signatures, fidélisation... Vous êtes maintenant prêt à exercer avec professionnalisme et confiance. Allons-y !`
  }
};

// Créer les répertoires
const dirs = [
  resolve(ROOT, "public", "audio", "speakers"),
  resolve(ROOT, "public", "audio", "generated"),
  resolve(ROOT, "public", "videos", "avatars"),
  resolve(ROOT, "public", "subtitles")
];

dirs.forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`📁 Créé: ${dir}`);
  }
});

// Créer un fichier référence vide (à remplacer par vraie voix)
const referencePath = resolve(ROOT, "public", "audio", "speakers", "marie-reference.txt");
if (!existsSync(referencePath)) {
  writeFileSync(referencePath, `# Fichier référence pour Marie
# Remplacez ce fichier par: marie-reference.wav
# 
# Instructions pour créer la référence:
# 1. Enregistrer 6-10 secondes de voix claire
# 2. Format: WAV, 22050Hz, mono
# 3. Contenu exemple: "Bonjour, je suis Marie, votre coach immobilier."
#
# Outils recommandés:
# - Audacity (gratuit)
# - Micro de qualité ou smartphone en mode avion
#
# Une fois créé, placez le fichier à:
# public/audio/speakers/marie-reference.wav
`);
  console.log(`📝 Créé: ${referencePath}`);
}

// Générer les scripts audio (placeholders)
console.log("\n🎙️  Génération des scripts audio pour Marie\n");

Object.entries(MARIE_CONFIG.intros).forEach(([key, text], index) => {
  const timestamp = Date.now() + index;
  const outputName = `marie-intro-${key}`;
  
  // Métadonnées
  const metadata = {
    speaker: "marie",
    voice_name: MARIE_CONFIG.name,
    module: key,
    text: text,
    language: "fr",
    estimated_duration: Math.ceil(text.length / 15),
    word_count: text.split(/\s+/).length,
    character_count: text.length,
    generated_at: new Date().toISOString(),
    
    // Liens vers fichiers
    audio_path: `/audio/generated/${outputName}.mp3`,
    subtitle_path: `/subtitles/${outputName}.srt`,
    
    // Utilisation dans l'interface
    usage: {
      component: "SadTalkerAvatar",
      props: {
        imageUrl: "/avatars/marie.jpg",
        audioUrl: `/audio/generated/${outputName}.mp3`,
        transcript: text
      }
    }
  };
  
  // Sauvegarder métadonnées
  const metaPath = resolve(ROOT, "public", "audio", "generated", `${outputName}.json`);
  writeFileSync(metaPath, JSON.stringify(metadata, null, 2));
  
  // Créer placeholder audio (à remplacer par vrai XTTS)
  const placeholderPath = resolve(ROOT, "public", "audio", "generated", `${outputName}.txt`);
  writeFileSync(placeholderPath, `# Audio placeholder: ${outputName}
# Texte (${metadata.word_count} mots, ~${metadata.estimated_duration}s):
${text}

# Pour générer le vrai audio:
# 1. Assurez-vous que XTTS est lancé: python -m TTS.server.server --port 5000
# 2. Exécutez:
node scripts/voice/xtts-generate.mjs \
  --text="${text.replace(/"/g, '\\"')}" \
  --speaker=marie \
  --output=${outputName}.mp3

# 3. Générez les sous-titres:
node scripts/subtitles/whisperx-generate.mjs \
  --video=public/audio/generated/${outputName}.mp3 \
  --lang=fr
`);
  
  console.log(`✅ ${key.padEnd(12)} → ${metadata.word_count} mots, ~${metadata.estimated_duration}s`);
});

// Créer le composant de démo
console.log("\n🎬 Création de la page de démo...\n");

const demoPageCode = `'use client';

import { useState } from 'react';
import { SadTalkerAvatar } from '@/components/avatars/SadTalkerAvatar';
import { Play, Pause, Volume2, Mic, BookOpen, Home, DollarSign, TrendingUp, MapPin, Award } from 'lucide-react';

const MODULES = [
  { id: 'welcome', name: 'Introduction', icon: Award, color: '#c9a227' },
  { id: 'juridique', name: 'Juridique', icon: BookOpen, color: '#3b82f6' },
  { id: 'transaction', name: 'Transaction', icon: Home, color: '#22c55e' },
  { id: 'financement', name: 'Financement', icon: DollarSign, color: '#8b5cf6' },
  { id: 'marketing', name: 'Marketing', icon: TrendingUp, color: '#f59e0b' },
  { id: 'terrain', name: 'Terrain', icon: MapPin, color: '#ef4444' },
];

export default function MarieAvatarDemo() {
  const [selectedModule, setSelectedModule] = useState('welcome');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);

  // Les métadonnées sont chargées depuis /audio/generated/
  const audioBase = '/audio/generated';
  const avatarBase = '/avatars';

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🤖 Avatar Marie avec <span className="text-gold-400">XTTS + SadTalker</span>
          </h1>
          <p className="text-white/60">
            Démonstration du pipeline vidéo: Voix clonée → Avatar synchronisé → Sous-titres
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Sélection module */}
          <div className="space-y-3">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Mic className="w-5 h-5 text-gold-400" />
              Sélectionner le module
            </h2>
            
            {MODULES.map((module) => {
              const Icon = module.icon;
              const isActive = selectedModule === module.id;
              
              return (
                <button
                  key={module.id}
                  onClick={() => setSelectedModule(module.id)}
                  className={\`
                    w-full p-4 rounded-xl flex items-center gap-3 transition-all
                    \${isActive 
                      ? 'bg-gold-400/20 border-2 border-gold-400' 
                      : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                    }
                  \`}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: \`\${module.color}20\` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: module.color }} />
                  </div>
                  <span className={\`font-medium \${isActive ? 'text-gold-400' : 'text-white'}\`}>
                    {module.name}
                  </span>
                  {isActive && <Play className="w-4 h-4 text-gold-400 ml-auto" />}
                </button>
              );
            })}

            {/* Instructions */}
            <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <h3 className="text-amber-400 font-medium mb-2">⚠️ Prérequis</h3>
              <ul className="text-amber-200/70 text-sm space-y-1">
                <li>1. Lancer XTTS: <code className="text-amber-300">python -m TTS.server.server</code></li>
                <li>2. Placer <code className="text-amber-300">marie-reference.wav</code> dans speakers/</li>
                <li>3. Générer audios: <code className="text-amber-300">node scripts/voice/xtts-generate.mjs</code></li>
                <li>4. (Optionnel) SadTalker pour vidéos avatar</li>
              </ul>
            </div>
          </div>

          {/* Zone principale - Avatar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Avatar */}
            <SadTalkerAvatar
              imageUrl={\`\${avatarBase}/marie.jpg\`}
              audioUrl={\`\${audioBase}/marie-intro-\${selectedModule}.mp3\`}
              transcript={MODULES.find(m => m.id === selectedModule)?.name}
              mode="canvas"
              className="w-full aspect-video"
              onReady={() => console.log('Avatar prêt')}
              onError={(err) => console.error('Erreur:', err)}
            />

            {/* Contrôles */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-gold-400 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-navy-900" />
                  ) : (
                    <Play className="w-6 h-6 text-navy-900 ml-1" />
                  )}
                </button>
                
                <div>
                  <h3 className="text-white font-medium">
                    {MODULES.find(m => m.id === selectedModule)?.name}
                  </h3>
                  <p className="text-white/50 text-sm">
                    Marie • Voix XTTS • Avatar SadTalker
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className={\`
                  px-4 py-2 rounded-lg font-medium transition-colors
                  \${showTranscript 
                    ? 'bg-gold-400 text-navy-900' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                  }
                \`}
              >
                Sous-titres
              </button>
            </div>

            {/* Métadonnées techniques */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-gold-400">XTTS v2</div>
                <div className="text-white/50 text-sm">Coqui TTS</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-gold-400">6s</div>
                <div className="text-white/50 text-sm">Audio référence</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-gold-400">FR</div>
                <div className="text-white/50 text-sm">Langue forcée</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

const demoPagePath = resolve(ROOT, "src", "app", "formation", "marie-avatar-demo", "page.tsx");
const demoDir = dirname(demoPagePath);

if (!existsSync(demoDir)) {
  mkdirSync(demoDir, { recursive: true });
}

writeFileSync(demoPagePath, demoPageCode);
console.log(`✅ Page démo créée: src/app/formation/marie-avatar-demo/page.tsx`);

// Récapitulatif
console.log("\n" + "=".repeat(60));
console.log("🎉 AVATAR MARIE AVEC VOIX - CONFIGURATION COMPLÈTE");
console.log("=".repeat(60));
console.log("\n📂 Fichiers créés:");
console.log("  ✓ Scripts audio générés (métadonnées)");
console.log("  ✓ Page démo: /formation/marie-avatar-demo");
console.log("  ✓ Configuration référence voix");
console.log("\n🚀 Pour activer la voix:");
console.log("  1. Créer public/audio/speakers/marie-reference.wav");
console.log("  2. Lancer: python -m TTS.server.server --port 5000");
console.log("  3. Exécuter: node scripts/generate-marie-intro.mjs");
console.log("  4. Visiter: http://localhost:3000/formation/marie-avatar-demo");
console.log("\n📝 Scripts générés:");
Object.keys(MARIE_CONFIG.intros).forEach(key => {
  console.log(`  • marie-intro-${key}.mp3 (${MARIE_CONFIG.intros[key].length} caractères)`);
});
console.log("\n" + "=".repeat(60));
